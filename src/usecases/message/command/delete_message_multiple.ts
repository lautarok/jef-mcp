import ContainerPort from "../../../ports/container_port"
import MessageRepositoryPort, { MessageRepositoryPortSymbol } from "../../../ports/database/message_repository"

export default class DeleteMessageMultipleCommand {
    private readonly messageRepository: MessageRepositoryPort

    constructor(
        container: ContainerPort
    ) {
        this.messageRepository = container.inject(MessageRepositoryPortSymbol)!
    }

    public execute = async (id: number[]) => {
        await this.messageRepository.deleteMany(id)
    }
}

export const DeleteMessageMultipleCommandSymbol = Symbol("DeleteMessageMultipleCommand")