import Database from "./database"
import fs from "node:fs/promises"
import path from "node:path"
import ContainerPort from "../../../ports/container_port"
import ConfigPort, { ConfigPortSymbol } from "../../../ports/config"

export default class Migrations {
    config: ConfigPort

    constructor(
        private readonly container: ContainerPort,
        private readonly database: Database
    ) {
        this.config = this.container.inject<ConfigPort>(ConfigPortSymbol)!
    }

    public async migrate(up = true) {
        const migrationsPath = this.config.databaseMigrationsPath
        const files = await fs.readdir(migrationsPath)

        for await (const file of files) {
            if (
                (up && !file.endsWith(".up.sql"))
                || (!up && !file.endsWith(".down.sql"))
            ) {
                continue
            }

            const fileContent = await fs.readFile(
                path.resolve(migrationsPath, file)
            )

            this.database.exec(fileContent.toString())
        }
    }
}