import Message from "../../domain/message"

export default interface MessageRepositoryPort {
    createOne: (message: Message) => Promise<Message>
    findMany: (data: {month: number, year: number, limit: number, offset: number}) => Promise<{total: number, items: Message[]}>
    deleteMany: (id: number[]) => Promise<void>
    getLastMailReadedDate: () => Promise<Date | undefined>
}

export const MessageRepositoryPortSymbol = Symbol("MessageRepositoryPort")