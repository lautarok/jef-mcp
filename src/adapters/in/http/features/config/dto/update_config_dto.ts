import InvalidInputError from "../../../../../../errors/invalid_input"

type MessageCreationConfigType = {
    allow: {
        property: string,
        include: string
    }[],
    prevent: {
        property: string,
        include: string
    }[]
}

export default class UpdateConfigDto {
    constructor(
        public messageCreation: MessageCreationConfigType
    ) {}

    public validate = () => {
        const messageCreation = this.messageCreation
        
        if (!messageCreation) {
            throw new InvalidInputError()
        }

        if (
            !Array.isArray(messageCreation.allow)
            || messageCreation.allow.some(rule =>
                (!rule.include) || (!rule.property)
            )
        ) {
            throw new InvalidInputError("Invalid message creation allow list")
        }

        if (
            !Array.isArray(messageCreation.prevent)
            || messageCreation.prevent.some(rule =>
                (!rule.include) || (!rule.property)
            )
        ) {
            throw new InvalidInputError("Invalid message creation prevent list")
        }
    }
}