import ConfigMessageCreation from "../../../../domain/config_message_creation";
import Message from "../../../../domain/message";
import ConfigRepositoryPort from "../../../../ports/database/config_repository";
import Database from "../database";

export default class ConfigRepository implements ConfigRepositoryPort {
    constructor(
        private readonly database: Database
    ) {}

    updateConfigAllowMessageCreation = async (allowMessageCreation: ConfigMessageCreation[]) => {
        const database = this.database

        try {
            database.beginTransaction()

            database.execute(`
                DELETE FROM \`config_allow_message_creation\`
            `)

            for (const messageCreation of allowMessageCreation) {
                database.execute(`
                    INSERT INTO \`config_allow_message_creation\` (
                        \`property\`, \`includes\`
                    ) VALUES (?, ?);
                `, [
                    messageCreation.property,
                    messageCreation.includes
                ])
            }

            database.commit()
        } catch(_) {
            database.rollback()
        }
    }

    updateConfigPreventMessageCreation = async (preventMessageCreation: ConfigMessageCreation[]) => {
        const database = this.database

        try {
            database.beginTransaction()

            database.execute(`
                DELETE FROM \`config_prevent_message_creation\`
            `)

            for (const messageCreation of preventMessageCreation) {
                database.execute(`
                    INSERT INTO \`config_prevent_message_creation\` (
                        \`property\`, \`includes\`
                    ) VALUES (?, ?);
                `, [
                    messageCreation.property,
                    messageCreation.includes
                ])
            }

            database.commit()
        } catch(_) {
            database.rollback()
        }
    }

    getConfigAllowMessageCreation = async () => {
        const result = this.database.queryAll(`
            SELECT * FROM config_allow_message_creation
        `)

        return result.map(config => new ConfigMessageCreation()
            .setIncludes(config["includes"])
            .setProperty(config["property"])
        )
    }

    getConfigPreventMessageCreation = async () => {
        const result = this.database.queryAll(`
            SELECT * FROM config_prevent_message_creation
        `)

        return result.map(config => new ConfigMessageCreation()
            .setIncludes(config["includes"])
            .setProperty(config["property"])
        )
    }

    validateMessageCreation = async (message: Message) => {
        const allowConfig = await this.getConfigAllowMessageCreation()
        if (allowConfig.length > 0) {
            for (const rule of allowConfig) {
                if (
                    (
                        rule.property === "content"
                        && !message.content.toLowerCase().includes(rule.includes.toLowerCase())
                    ) || (
                        rule.property === "sender"
                        && !message.sender.toLowerCase().includes(rule.includes.toLowerCase())
                    ) || (
                        rule.property === "platform"
                        && !message.platform.toLowerCase().includes(rule.includes.toLowerCase())
                    )
                ) {
                    return false
                }
            }
        }

        const preventConfig = await this.getConfigPreventMessageCreation()
        if (preventConfig.length > 0) {
            for (const rule of preventConfig) {
                if (
                    (
                        rule.property === "content"
                        && message.content.includes(rule.includes)
                    ) || (
                        rule.property === "sender"
                        && message.sender.includes(rule.includes)
                    ) || (
                        rule.property === "platform"
                        && message.platform.includes(rule.includes)
                    )
                ) {
                    return false
                }
            }
        }

        return true
    }

    public getConfig = async () => {
        return {
            message: {
                creation: {
                    allow: await this.getConfigAllowMessageCreation(),
                    prevent: await this.getConfigPreventMessageCreation()
                }
            }
        }
    }
}