import ContainerPort from "../../../ports/container_port"
import ConfigRepositoryPort, { ConfigRepositoryPortSymbol } from "../../../ports/database/config_repository"

export default class FindConfigQuery {
    private readonly configRepository: ConfigRepositoryPort

    constructor(
        container: ContainerPort
    ) {
        this.configRepository = container.inject(ConfigRepositoryPortSymbol)!
    }

    public execute = async () => {
        return await this.configRepository.getConfig()
    }
}

export const FindConfigQuerySymbol = Symbol("FindConfigQuery")