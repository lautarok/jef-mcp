import ConfigMessageCreation from "../../domain/config_message_creation"
import Message from "../../domain/message"

export default interface ConfigRepositoryPort {
    updateConfigAllowMessageCreation(allowMessageCreation: ConfigMessageCreation[]): Promise<void>
    updateConfigPreventMessageCreation(preventMessageCreation: ConfigMessageCreation[]): Promise<void>
    validateMessageCreation(message: Message): Promise<boolean>
    getConfig(): Promise<{
        message: {
            creation: {
                allow: ConfigMessageCreation[],
                prevent: ConfigMessageCreation[]
            }
        }
    }>
}

export const ConfigRepositoryPortSymbol = Symbol("ConfigRepositoryPort")