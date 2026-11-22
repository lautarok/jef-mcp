export default class InvalidInputError implements Error {
    name = "INVALID_INPUT"
    message: string

    constructor(message: string = "invalid input") {
        this.message = message
    }
}