import ContainerPort from "../../../ports/container_port"

export default class Container implements ContainerPort {
    private components = new WeakMap<Symbol, {
        component: any,
        params: any[],
        instance?: any
    }>()

    registerComponent(symbol: Symbol, component: any, params: any[] = []): void {
        this.components.set(symbol, {
            component,
            params
        })
    }

    inject<T>(symbol: Symbol): T | null {
        const componentData = this.components.get(symbol)
        if (!componentData) return null

        const {component, params, instance} = componentData
        
        if (instance) {
            return instance
        }

        const newInstance = new component(...params) as T
        componentData.instance = newInstance

        return newInstance
    }
}