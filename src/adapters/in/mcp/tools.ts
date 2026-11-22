import { McpServer } from "@modelcontextprotocol/sdk/server/mcp"
import ContainerPort from "../../../ports/container_port"
import FindManyMessageQuery, { FindManyMessageQuerySymbol } from "../../../usecases/message/query/find_many_message"
import z from "zod"
import DeleteMessageMultipleCommand, { DeleteMessageMultipleCommandSymbol } from "../../../usecases/message/command/delete_message_multiple"
import ConfigPort, { ConfigPortSymbol } from "../../../ports/config"

export default class McpTools {
    findManyMessages: FindManyMessageQuery
    deleteMessageMultiple: DeleteMessageMultipleCommand

    constructor(
        container: ContainerPort,
        private readonly server: McpServer
    ) {
        this.findManyMessages = container.inject(FindManyMessageQuerySymbol)!
        this.deleteMessageMultiple = container.inject(DeleteMessageMultipleCommandSymbol)!
    }

    setup = () => {
        const server = this.server

        server.registerTool(
            "search_personal_financial_records",
            {
                title: "Search Personal Financial Records",
                description:  `
                    Search the user's stored emails, SMS messages, payment notifications,
                    receipts and other personal communications for financial information.

                    This tool is the primary source of information about the user's personal
                    financial activity.

                    MUST be used whenever the user asks about:
                    - Money spent or received.
                    - Monthly, weekly or daily spending.
                    - Payments, purchases, deposits or withdrawals.
                    - Transfers, balances or financial transactions.
                    - Financial activity or actions performed with their money.
                    - Payment confirmations, receipts or transaction history.

                    Search the stored communications for actual transaction evidence.
                    Distinguish completed, pending, failed and refunded transactions.

                    Do not fabricate financial information or calculate financial totals
                    without retrieving the relevant records first.
                    Do not use external web searches as a substitute for this tool
                    when the user asks about their own financial activity.
                `,
                inputSchema: z.object({
                    month: z.number().int().min(1).max(12),
                    year: z.number().int().min(2000),
                    limit: z.number().int().max(15),
                    offset: z.number().int()
                })
            },
            async (data: {month: number, year: number, limit: number, offset: number}) => ({
                content: [{
                    type: "text",
                    text: JSON.stringify({messages: await this.findManyMessages.execute(data)})
                }]
            })
        )
        
        server.registerTool(
            "delete_personal_records",
            {
                title: "Delete Personal Records",
                description: `
                    Delete stored personal messages, emails, SMS messages, notifications
                    and other records from the application's database.

                    Use this tool only when the user explicitly requests the deletion
                    of stored records.

                    This tool permanently removes the specified records from the system.
                    Do not invoke it when the user merely asks to read, search, analyze,
                    summarize or review their messages.

                    Before deleting records, ensure the requested IDs are correctly
                    identified and that the deletion matches the user's intent.
                `,
                inputSchema: z.object({
                    id: z.array(z.number().int())
                })
            },
            async (data: {id: number[]}) => {
                await this.deleteMessageMultiple.execute(data.id)

                return {
                    content: [{
                        type: "text",
                        text: "success"
                    }]
                }
            }
        )
    }
}