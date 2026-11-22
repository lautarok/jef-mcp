import ConfigMessageCreation from "../../../domain/config_message_creation"
import ContainerPort from "../../../ports/container_port"
import ConfigRepositoryPort, { ConfigRepositoryPortSymbol } from "../../../ports/database/config_repository"

export default class UpdateConfigCommand {
    private readonly configRepository: ConfigRepositoryPort

    constructor(container: ContainerPort) {
        this.configRepository = container.inject(ConfigRepositoryPortSymbol)!
    }

    public execute = async ({
        configAllow,
        configPrevent
    }: {
        configAllow: ConfigMessageCreation[],
        configPrevent: ConfigMessageCreation[]
    }) => {
        await this.configRepository.updateConfigAllowMessageCreation(configAllow)
        await this.configRepository.updateConfigPreventMessageCreation(configPrevent)
    }
}

export const UpdateConfigCommandSymbol = Symbol("UpdateConfigCommand")