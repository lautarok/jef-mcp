import InvalidInputError from "../../../../../../errors/invalid_input"

export default class DeleteMessageMultipleDto {
    id: number[]

    constructor({id}: {id: number[]}) {
        this.id = id ?? []
    }

    validate() {
        if (
            !Array.isArray(this.id)
            || this.id.length == 0
            || this.id.some(id => typeof id !== "number")
        ) {
            throw new InvalidInputError("Invalid id")
        }
    }
}