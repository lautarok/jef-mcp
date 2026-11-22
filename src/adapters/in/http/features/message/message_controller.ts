import { Request, Response } from "express"
import ContainerPort from "../../../../../ports/container_port"
import CreateOneMessageCommand, { CreateOneMessageCommandSymbol } from "../../../../../usecases/message/command/create_one_message"
import FindManyMessageQuery, { FindManyMessageQuerySymbol } from "../../../../../usecases/message/query/find_many_message"
import Message from "../../../../../domain/message"
import CreateOneMessageDto from "./dto/create_one_message_dto"
import DeleteMessageMultipleDto from "./dto/delete_message_multiple_dto"
import DeleteMessageMultipleCommand, { DeleteMessageMultipleCommandSymbol } from "../../../../../usecases/message/command/delete_message_multiple"

export default class MessageController {
    private readonly createOneCommand: CreateOneMessageCommand
    private readonly findManyQuery: FindManyMessageQuery
    private readonly deleteMultipleCommand: DeleteMessageMultipleCommand

    constructor(
        container: ContainerPort
    ) {
        this.createOneCommand = container.inject<CreateOneMessageCommand>(CreateOneMessageCommandSymbol)!
        this.findManyQuery = container.inject<FindManyMessageQuery>(FindManyMessageQuerySymbol)!
        this.deleteMultipleCommand = container.inject<DeleteMessageMultipleCommand>(DeleteMessageMultipleCommandSymbol)!
    }

    public get = async (_: Request, res: Response) => {
        const result = await this.findManyQuery.execute({
            month: new Date().getUTCMonth() + 1,
            year: new Date().getUTCFullYear(),
            limit: 5000,
            offset: 0
        })

        res.json({
            total: result.total,
            items: result.items.map(r => ({
                id: r.id,
                platform: r.platform,
                sender: r.sender,
                content: r.content,
                createdAt: r.createdAt
            }))
        })
    }

    public post = async (req: Request, res: Response) => {
        const dto = new CreateOneMessageDto(req.body)
        dto.validate()

        const message = new Message()
            .setPlatform(dto.platform)
            .setSender(dto.sender)
            .setContent(dto.content)

        const result = await this.createOneCommand.execute(message)

        res.json(result)
    }

    public delete = async (req: Request, res: Response) => {
        const dto = new DeleteMessageMultipleDto(req.body)
        dto.validate()

        await this.deleteMultipleCommand.execute(dto.id)

        res.sendStatus(204)
    }
}