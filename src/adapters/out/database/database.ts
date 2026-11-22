import sqlite from "node:sqlite"
import ConfigPort, { ConfigPortSymbol } from "../../../ports/config"
import ContainerPort from "../../../ports/container_port"

export default class Database {
    private config: ConfigPort
    private database: sqlite.DatabaseSync

    constructor(
        container: ContainerPort
    ) {
        this.config = container.inject(ConfigPortSymbol)!
        this.database = new sqlite.DatabaseSync(this.config.databasePath)
    }

    public execute(query: string, params: (number|string)[] = []) {
        this.database.prepare(query).run(...params)
    }

    public exec(query: string) {
        this.database.exec(query)
    }

    public queryAll(query: string, params: (number|string)[] = []): Record<string, any>[] {
        return this.database.prepare(query).all(...params)
    }

    public beginTransaction() {
        this.database.exec("BEGIN TRANSACTION")
    }

    public commit() {
        this.database.exec("COMMIT")
    }

    public rollback() {
        this.database.exec("ROLLBACK")
    }

    public close() {
        this.database.close()
    }
}