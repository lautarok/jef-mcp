export default class Message {
    id?: number
    platform = ""
    sender = ""
    content = ""
    createdAt = new Date()
    updatedAt = new Date()

    setId(id: number) {
        this.id = id
        return this
    }

    setPlatform(platform: string) {
        this.platform = platform
        return this
    }

    setSender(sender: string) {
        this.sender = sender
        return this
    }

    setContent(content: string) {
        this.content = content
        return this
    }

    setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt
        return this
    }

    setUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt
        return this
    }
}