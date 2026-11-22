import { Request, Response, NextFunction } from "express";
import ContainerPort from "../../../../ports/container_port";
import ConfigPort, { ConfigPortSymbol } from "../../../../ports/config";

export default class AuthMiddleware {
    private readonly config: ConfigPort

    constructor(
        container: ContainerPort
    ) {
        this.config = container.inject(ConfigPortSymbol)!
    }

    public execute = (req: Request, res: Response, next: NextFunction) => {
        const apiKeyHeader = req.header("X-Api-Key")
        
        if (
            !apiKeyHeader
            || apiKeyHeader != this.config.apiKey
        ) {
            res.status(401).send("invalid api key")
            return
        }

        next()
    }
}