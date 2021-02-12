import express from "express"
import cors from "cors"
import { AddressInfo} from "net"
import { userRouter } from "./data/routes/userRouter"

const app = express()
app.use(express.json())
app.use(cors())

//EndPoints
app.use("/user", userRouter)

//Server Init
const server = app.listen(3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost:${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
 });  