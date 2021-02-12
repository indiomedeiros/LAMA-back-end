import express from "express"
import { BandController } from "../../controller/BandController";



export const bandRouter = express.Router();
const bandController = new BandController();

//no index será usado app.use("/band", bandRouter)
bandRouter.post("/create", bandController.bandSignup) 
bandRouter.post("/:id", bandController.getBandById)