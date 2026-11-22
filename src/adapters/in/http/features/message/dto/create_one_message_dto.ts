import InvalidInputError from "../../../../../../errors/invalid_input"

export default class CreateOneMessageDto {
    platform: string
    sender: string
    content: string

    constructor(data?: {
        platform?: string,
        sender?: string,
        content?: string
    }) {
        this.platform = data?.platform ?? ""
        this.content = data?.content ?? ""
        this.sender = data?.sender ?? ""
    }

    public validate() {
        if (
            this.platform.length < 1
            || this.platform.length > 120
        ) {
            throw new InvalidInputError("Invalid platform")
        }

        if (
            this.sender.length < 1
            || this.sender.length > 100
        ) {
            throw new InvalidInputError("Invalid sender")
        }

        if (
            this.content.length < 1
            || this.content.length > 1000000000
        ) {
            throw new InvalidInputError("Invalid content")
        }
    }
}