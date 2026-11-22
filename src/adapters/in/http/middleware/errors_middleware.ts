import { Request, Response, NextFunction } from "express";
import InvalidInputError from "../../../../errors/invalid_input";

export default class ErrorsMiddleware {
    public execute(err: Error, _: Request, res: Response, next: NextFunction): void {
        if (!err) {
            next()
            return
        }

        console.error(err)

        if (err instanceof InvalidInputError) {
            res.status(400).send(err.message)
            return
        } else if (err instanceof SyntaxError) {
            res.status(400).send(err.message)
        }

        res.status(500).send("Internal server error")
        throw err
    }
}