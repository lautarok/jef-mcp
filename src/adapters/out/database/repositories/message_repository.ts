import Message from "../../../../domain/message";
import ParseDatePkg from "../../../../pkg/parse_date";
import MessageRepositoryPort from "../../../../ports/database/message_repository";
import Database from "../database";

export default class MessageRepository implements MessageRepositoryPort {
    constructor(
        private readonly database: Database
    ) {}

    createOne = async (message: Message) => {
        this.database.execute(`
            INSERT INTO \`messages\` (
                \`platform\`,
                \`sender\`,
                \`content\`,
                \`created_at\`,
                \`updated_at\`
            ) VALUES (?, ?, ?, ?, ?)
        `, [
            message.platform,
            message.sender,
            message.content,
            ParseDatePkg.parse(message.createdAt),
            ParseDatePkg.parse(message.updatedAt)
        ])
        
        return message
    }

    findMany = async ({month, year, limit, offset}: {month: number, year: number, limit: number, offset: number}) => {
        const result = this.database.queryAll(`
            SELECT * FROM \`messages\`
            WHERE \`created_at\` BETWEEN ? AND ?
            ORDER BY \`id\` DESC
            LIMIT ? OFFSET ?;
        `, [`${year}-${month}-01`, `${year}-${month+1}-01`, limit, offset])

        const count = this.database.queryAll(`
            SELECT COUNT(id) AS 'total' FROM \`messages\`;
        `)[0]
        
        return {
            total: parseInt(count["total"]),
            items: result.map((message: Record<string, any>) =>
                new Message()
                    .setId(message["id"])
                    .setPlatform(message["platform"])
                    .setSender(message["sender"])
                    .setContent(message["content"])
                    .setCreatedAt(new Date(message["created_at"]))
                    .setUpdatedAt(new Date(message["updated_at"]))
            )
        }
    }

    deleteMany = async (id: number[]) => {
        this.database.execute(`
            DELETE FROM \`messages\`
            WHERE \`id\` IN (?)
        `, [id.join(", ")])
    }

    getLastMailReadedDate = async () => {
        const result = this.database.queryAll(`
            SELECT \`created_at\` FROM \`messages\`
            WHERE \`platform\` = 'E-Mail'
            ORDER BY \`id\` ASC LIMIT 1
        `)

        return result?.[0]?.["created_at"] ? new Date(result?.[0]?.["created_at"])
            : undefined
    }
}