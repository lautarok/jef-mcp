import Message from "../domain/message"

export default interface MailPort {
    getUnreaded(from?: Date): Promise<Message[]>
}

export const MailPortSymbol = Symbol("MailPort")