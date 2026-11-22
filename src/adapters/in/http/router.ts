import ContainerPort from "../../../ports/container_port"
import express from "express"
import MessageController from "./features/message/message_controller"
import ConfigController from "./features/config/config_controller"

export default class HttpRouter {
    messageController: MessageController
    configController: ConfigController

    constructor(
        private readonly container: ContainerPort
    ) {
        this.messageController = new MessageController(this.container)
        this.configController = new ConfigController(this.container)!
    }

    public getRouter() {
        const router = express.Router()
        
        router.get("/message", this.messageController.get)
        router.post("/message", this.messageController.post)
        router.delete("/message", this.messageController.delete)
        
        router.put("/config", this.configController.put)
        router.get("/config", this.configController.get)

        return router
    }
}