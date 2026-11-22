import Mcp from "../../adapters/in/mcp/mcp"
import Config from "../../adapters/out/config/config"
import Container from "../../adapters/out/container/container"
import Database from "../../adapters/out/database/database"
import MessageRepository from "../../adapters/out/database/repositories/message_repository"
import { ConfigPortSymbol } from "../../ports/config"
import { MessageRepositoryPortSymbol } from "../../ports/database/message_repository"
import DeleteMessageMultipleCommand, { DeleteMessageMultipleCommandSymbol } from "../../usecases/message/command/delete_message_multiple"
import FindManyMessageQuery, { FindManyMessageQuerySymbol } from "../../usecases/message/query/find_many_message"

const container = new Container()

container.registerComponent(ConfigPortSymbol, Config)

const database = new Database(container)
container.registerComponent(MessageRepositoryPortSymbol, MessageRepository, [database])

container.registerComponent(FindManyMessageQuerySymbol, FindManyMessageQuery, [container])
container.registerComponent(DeleteMessageMultipleCommandSymbol, DeleteMessageMultipleCommand, [container])

const mcp = new Mcp(container)
mcp.serve()