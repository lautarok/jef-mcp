import { loadEnvFile } from "node:process"
import ConfigPort from "../../../ports/config"

loadEnvFile()

export default class Config implements ConfigPort {
    httpPort = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 8000

    databasePath = process.env.DATABASE_PATH ?? "./database.sqlite"
    databaseMigrationsPath = process.env.DATABASE_MIGRATIONS_PATH ?? "./migrations"

    mailUser = process.env.MAIL_USER
    mailPassword = process.env.MAIL_PASSWORD
    mailHost = process.env.MAIL_HOST
    mailPort = parseInt(process.env.MAIL_PORT ?? "995")
    mailTls = process.env.MAIL_TLS?.toLowerCase() === "true"

    apiKey = process.env.API_KEY ?? "secret"
}