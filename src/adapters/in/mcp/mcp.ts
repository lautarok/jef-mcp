import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import ContainerPort from "../../../ports/container_port";
import McpTools from "./tools";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";

export default class Mcp {
    private readonly server = new McpServer({
        name: "José MCP",
        version: "1.0.0"
    })

    private readonly tools: McpTools

    constructor(
        container: ContainerPort
    ) {
        this.tools = new McpTools(container, this.server)
    }

    serve = () => {
        this.tools.setup()

        const transport = new StdioServerTransport()
        this.server.connect(transport)
    }
}