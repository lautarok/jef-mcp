export default interface ConfigPort {
    httpPort: number

    databasePath: string
    databaseMigrationsPath: string

    mailUser?: string
    mailPassword?: string
    mailHost?: string
    mailPort?: number
    mailTls?: boolean

    apiKey: string
}

export const ConfigPortSymbol = Symbol("ConfigPort")