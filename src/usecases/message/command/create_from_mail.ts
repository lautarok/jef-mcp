import Message from "../../../domain/message"
import ContainerPort from "../../../ports/container_port"
import ConfigRepositoryPort, { ConfigRepositoryPortSymbol } from "../../../ports/database/config_repository"
import MessageRepositoryPort, { MessageRepositoryPortSymbol } from "../../../ports/database/message_repository"
import MailPort, { MailPortSymbol } from "../../../ports/mail"

export default class CreateFromMailMessageCommand {
    private readonly messageRepository: MessageRepositoryPort
    private readonly configRepository: ConfigRepositoryPort
    private readonly mail: MailPort

    constructor(
        container: ContainerPort
    ) {
        this.messageRepository = container.inject(MessageRepositoryPortSymbol)!
        this.mail = container.inject(MailPortSymbol)!
        this.configRepository = container.inject(ConfigRepositoryPortSymbol)!
    }

    public execute = async () => {
        const unreaded = await this.mail.getUnreaded(
            await this.messageRepository.getLastMailReadedDate()
        )
        if (unreaded.length > 0) {
            for (const message of unreaded) {
                if (await this.configRepository.validateMessageCreation(message)) {
                    await this.messageRepository.createOne(message)
                }
            }
        }
    }
}

export const CreateFromMailMessageCommandSymbol = Symbol("CreateFromMailMessageCommand")