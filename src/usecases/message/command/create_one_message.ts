import Message from "../../../domain/message"
import ContainerPort from "../../../ports/container_port"
import ConfigRepositoryPort, { ConfigRepositoryPortSymbol } from "../../../ports/database/config_repository"
import MessageRepositoryPort, { MessageRepositoryPortSymbol } from "../../../ports/database/message_repository"

export default class CreateOneMessageCommand {
    private readonly messageRepository: MessageRepositoryPort
    private readonly configRepository: ConfigRepositoryPort

    constructor(
        container: ContainerPort
    ) {
        this.messageRepository = container.inject(MessageRepositoryPortSymbol)!
        this.configRepository = container.inject(ConfigRepositoryPortSymbol)!
    }

    public execute = async (message: Message) => {
        if (await this.configRepository.validateMessageCreation(message)) {
            return await this.messageRepository.createOne(message)
        }
    }
}

export const CreateOneMessageCommandSymbol = Symbol("CreateOneMessageCommand")