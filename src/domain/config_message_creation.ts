export default class ConfigMessageCreation {
    property = ""
    includes = ""

    setProperty(property: string) {
        this.property = property
        return this
    }

    setIncludes(includes: string) {
        this.includes = includes
        return this
    }
}