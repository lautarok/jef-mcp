import Pop3Command from "node-pop3"
import { simpleParser } from "mailparser"
import Message from "../../../domain/message"
import ContainerPort from "../../../ports/container_port"
import ConfigPort, { ConfigPortSymbol } from "../../../ports/config"
import MailPort from "../../../ports/mail"

export default class Mail implements MailPort {
    config: ConfigPort

    constructor(
        container: ContainerPort
    ) {
        this.config = container.inject(ConfigPortSymbol)!
    }

    public getUnreaded = async (from?: Date): Promise<Message[]> => {
        const config = this.config
        if (
            !config.mailHost
            || !config.mailUser
            || !config.mailPassword
            || !config.mailPort
        ) {
            return []
        }

        const pop3 = new Pop3Command({
            user: config.mailUser,
            password: config.mailPassword,
            host: config.mailHost,
            port: config.mailPort,
            tls: config.mailTls
        })

        try {
            const stat = await pop3.STAT(),
                messagesLength = parseInt(stat.split(" ")[0])
                
            if (messagesLength <= 0) {
                return []
            }

            let messages = [] as Message[]
            for (let i = messagesLength; i >= Math.max(1, messagesLength - 50); i--) {
                const rawTop = await pop3.TOP(i, 0)
                const top = (Array.isArray(rawTop) ? rawTop.join("\r\n") : String(rawTop)) + "\r\n\r\n"
                const header = await simpleParser(top)
                const mailDate = header.date
                
                if (!mailDate) continue
                if (from && mailDate <= from) {
                    break
                }

                const rawRetr = await pop3.RETR(i),
                    raw = Array.isArray(rawRetr) ? rawRetr.join("\r\n") : rawRetr.toString(),
                    mail = await simpleParser(raw)

                const createdAt = mail.date || new Date()

                messages.push(
                    new Message()
                        .setPlatform("E-Mail")
                        .setCreatedAt(createdAt)
                        .setUpdatedAt(createdAt)
                        .setContent(`
                            Subject: ${mail.subject}.
                            Body: ${mail.text}    
                        `)
                        .setSender(mail.from?.text ?? "Unknown")
                )
            }

            return messages
        } catch (_) {
            return []
        }
        finally {
            try {
                await pop3.QUIT()
            } catch(_) {}
        }
    }
}