import Http from "../../adapters/in/http/http"
import Config from "../../adapters/out/config/config"
import Container from "../../adapters/out/container/container"
import Database from "../../adapters/out/database/database"
import ConfigRepository from "../../adapters/out/database/repositories/config_repository"
import MessageRepository from "../../adapters/out/database/repositories/message_repository"
import { ConfigPortSymbol } from "../../ports/config"
import { ConfigRepositoryPortSymbol } from "../../ports/database/config_repository"
import { MessageRepositoryPortSymbol } from "../../ports/database/message_repository"
import UpdateConfigCommand, { UpdateConfigCommandSymbol } from "../../usecases/config/command/update_config"
import FindConfigQuery, { FindConfigQuerySymbol } from "../../usecases/config/query/find_config"
import CreateOneMessageCommand, { CreateOneMessageCommandSymbol } from "../../usecases/message/command/create_one_message"
import DeleteMessageMultipleCommand, { DeleteMessageMultipleCommandSymbol } from "../../usecases/message/command/delete_message_multiple"
import FindManyMessageQuery, { FindManyMessageQuerySymbol } from "../../usecases/message/query/find_many_message"

const container = new Container()

container.registerComponent(ConfigPortSymbol, Config)

const database = new Database(container)
container.registerComponent(ConfigRepositoryPortSymbol, ConfigRepository, [database])
container.registerComponent(MessageRepositoryPortSymbol, MessageRepository, [database])

container.registerComponent(UpdateConfigCommandSymbol, UpdateConfigCommand, [container])
container.registerComponent(CreateOneMessageCommandSymbol, CreateOneMessageCommand, [container])
container.registerComponent(FindManyMessageQuerySymbol, FindManyMessageQuery, [container])
container.registerComponent(DeleteMessageMultipleCommandSymbol, DeleteMessageMultipleCommand, [container])
container.registerComponent(FindConfigQuerySymbol, FindConfigQuery, [container])

const http = new Http(container)

http.serve()