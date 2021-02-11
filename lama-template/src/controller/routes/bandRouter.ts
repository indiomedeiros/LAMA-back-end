import express from "express"
import { BandController } from "../BandController";



export const bandRouter = express.Router();
const bandController = new BandController();

//no index será usado app.use("/band", bandRouter)
bandRouter.post("/create", bandController.bandSignup) 