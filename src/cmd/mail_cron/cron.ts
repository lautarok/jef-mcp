import Cron from "../../adapters/in/cron/cron"
import Config from "../../adapters/out/config/config"
import Container from "../../adapters/out/container/container"
import Database from "../../adapters/out/database/database"
import ConfigRepository from "../../adapters/out/database/repositories/config_repository"
import MessageRepository from "../../adapters/out/database/repositories/message_repository"
import Mail from "../../adapters/out/mail/mail"
import { ConfigPortSymbol } from "../../ports/config"
import { ConfigRepositoryPortSymbol } from "../../ports/database/config_repository"
import { MessageRepositoryPortSymbol } from "../../ports/database/message_repository"
import { MailPortSymbol } from "../../ports/mail"
import CreateFromMailMessageCommand, { CreateFromMailMessageCommandSymbol } from "../../usecases/message/command/create_from_mail"

const container = new Container()

container.registerComponent(ConfigPortSymbol, Config)

const database = new Database(container)
container.registerComponent(ConfigRepositoryPortSymbol, ConfigRepository, [database])
container.registerComponent(MessageRepositoryPortSymbol, MessageRepository, [database])

container.registerComponent(MailPortSymbol, Mail, [container])
container.registerComponent(CreateFromMailMessageCommandSymbol, CreateFromMailMessageCommand, [container])

const cron = new Cron(container)

const runCron = async () => {
    await cron.run()
}

runCron()