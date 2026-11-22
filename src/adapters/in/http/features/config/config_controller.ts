import { Request, Response } from "express"
import ContainerPort from "../../../../../ports/container_port"
import UpdateConfigCommand, { UpdateConfigCommandSymbol } from "../../../../../usecases/config/command/update_config"
import UpdateConfigDto from "./dto/update_config_dto"
import ConfigMessageCreation from "../../../../../domain/config_message_creation"
import FindConfigQuery, { FindConfigQuerySymbol } from "../../../../../usecases/config/query/find_config"

export default class ConfigController {
    private readonly updateCommand: UpdateConfigCommand
    private readonly findQuery: FindConfigQuery

    constructor(container: ContainerPort) {
        this.updateCommand = container.inject(UpdateConfigCommandSymbol)!
        this.findQuery = container.inject(FindConfigQuerySymbol)!
    }

    public put = async (req: Request, res: Response) => {
        const dto = new UpdateConfigDto(req.body)
        dto.validate()

        await this.updateCommand.execute({
            configAllow: dto.messageCreation.allow.map(rule => new ConfigMessageCreation()
                .setIncludes(rule.include)
                .setProperty(rule.property)
            ),
            configPrevent: dto.messageCreation.prevent.map(rule => new ConfigMessageCreation()
                .setIncludes(rule.include)
                .setProperty(rule.property)
            )
        })

        res.sendStatus(200)
    }

    public get = async (_: Request, res: Response) => {
        res.status(200).json(
            await this.findQuery.execute()
        )
    }
}