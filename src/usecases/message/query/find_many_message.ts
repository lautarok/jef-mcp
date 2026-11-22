import Message from "../../../domain/message";
import ContainerPort from "../../../ports/container_port";
import MessageRepositoryPort, { MessageRepositoryPortSymbol } from "../../../ports/database/message_repository";

export default class FindManyMessageQuery {
    private readonly messageRepository: MessageRepositoryPort

    constructor(
        container: ContainerPort
    ) {
        this.messageRepository = container.inject(MessageRepositoryPortSymbol)!
    }

    public execute = async (data: {month: number, year: number, limit: number, offset: number}): Promise<{total: number, items: Message[]}> => {
        return await this.messageRepository.findMany(data)
    }
}

export const FindManyMessageQuerySymbol = Symbol("FindManyMessageQuery")