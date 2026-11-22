import express from "express"
import ContainerPort from "../../../ports/container_port"
import ConfigPort, { ConfigPortSymbol } from "../../../ports/config"
import HttpRouter from "./router"
import ErrorsMiddleware from "./middleware/errors_middleware"
import AuthMiddleware from "./middleware/auth_middleware"

export default class Http {
    private readonly app = express()
    private readonly config: ConfigPort

    constructor(
        private readonly container: ContainerPort
    ) {
        this.config = this.container.inject(ConfigPortSymbol)!
    }

    public serve() {
        const app = this.app

        app.use(new AuthMiddleware(this.container).execute)

        app.get("/", (req, res) => {
            res.send("Alive!")
        })

        app.use(express.json())

        const router = new HttpRouter(this.container).getRouter()
        app.use("/v1", router)

        app.use(new ErrorsMiddleware().execute)

        const port = this.config.httpPort

        app.listen(port, () => {
            console.log(`ADAPTER IN [HTTP]: Server is listening on port ${port}`)
        })
    }
}