//Imports
import express, {Express} from "express"
import cors from "cors"

//Connection
import { AddressInfo} from "net"
import { userRouter } from "./controller/routes/userRouter"

const app: Express = express()
app.use(express.json())
app.use(cors())

//EndPoints
app.use("/user", userRouter)

//Server Init
const server = app.listen(3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
       console.error(`Falha ao rodar o servidor.`);
    }
 });  