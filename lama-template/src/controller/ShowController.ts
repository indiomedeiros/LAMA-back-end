import { Request, Response } from "express";
import {
  GetShowByDayInputDTO,
  ScheduleInputDTO,
} from "../business/entities/Show";
import { Authenticator } from "../business/service/Authenticatior";
import { IdGenerator } from "../business/service/IdGenerator";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowDatabase } from "../data/ShowDatabase";

const showBusiness = new ShowBusiness(
  new IdGenerator(),
  new Authenticator(),
  new ShowDatabase()
);

export class ShowController {
  public async schedule(req: Request, res: Response): Promise<void> {
    try {
      const { band_id, week_day, start_time, end_time } = req.body;
      const token = req.headers.authorization as string;
      const scheduleInputDTO: ScheduleInputDTO = {
        band_id,
        week_day,
        start_time,
        end_time,
        token,
      };

      await showBusiness.schedule(scheduleInputDTO);

      res.status(200).send({ message: "scheduled show" });
    } catch (error) {
      res.status(error.statusCode || 400).send({ erro: error.message });
    }
  }

  public async getShowByDay(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string;
      const day = req.body.day;
      const getShowByDayInputDTO: GetShowByDayInputDTO = {
        day,
        token,
      };
      const result = await showBusiness.getShowByDay(getShowByDayInputDTO);
      res.status(201).send({ result });
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }
}
