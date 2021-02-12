import express from "express"
import cors from "cors"
import { AddressInfo} from "net"
import { userRouter } from "./data/routes/userRouter"
import { bandRouter } from "./data/routes/bandRouter"

const app = express()
app.use(express.json())
app.use(cors())

//EndPoints
app.use("/user", userRouter)
app.use("/band", bandRouter)
//Server Init
const server = app.listen(3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost:${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
 });  