export default interface ContainerPort {
    registerComponent(symbol: Symbol, component: any, params: any[]): void
    inject<T>(symbol: Symbol): T | null
}