//Imports
import express, {Express} from "express"

//Connection
import { AddressInfo} from "net"

const app: Express = express()
app.use(express.json())

//Server Init
const server = app.listen(3003, () => {
    if (server) {
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost:${address.port}`)
    }
    else {
        console.error(`Failure upon starting server`)
    }
})