import Database from "../../adapters/out/database/database"
import Config from "../../adapters/out/config/config"
import Container from "../../adapters/out/container/container"
import Migrations from "../../adapters/out/database/migrations"
import { ConfigPortSymbol } from "../../ports/config"

const container = new Container()

container.registerComponent(ConfigPortSymbol, Config)

const database = new Database(container),
    migrations = new Migrations(container, database)

migrations.migrate(false)