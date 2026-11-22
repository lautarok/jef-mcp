import ContainerPort from "../../../ports/container_port";
import CreateFromMailMessageCommand, { CreateFromMailMessageCommandSymbol } from "../../../usecases/message/command/create_from_mail";

export default class Cron {
    createFromMailMessage: CreateFromMailMessageCommand

    constructor(
        container: ContainerPort
    ) {
        this.createFromMailMessage = container.inject(CreateFromMailMessageCommandSymbol)!
    }

    public run = async () => {
        await this.createFromMailMessage.execute()
    }
}