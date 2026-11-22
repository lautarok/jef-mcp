export default class UnauthorizedError implements Error {
    name = "UNAUTHORIZED"
    message: string

    constructor(message: string = "unauthorized") {
        this.message = message
    }
}