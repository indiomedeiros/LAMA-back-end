import express from "express"
import { ShowController } from "../../controller/ShowController";



export const showRouter = express.Router();
const showController = new ShowController();

//no index será usado app.use("/show", showRouter)
showRouter.post("/schedule", showController.schedule )