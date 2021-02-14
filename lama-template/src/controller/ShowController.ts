import { Request, Response } from "express";
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
  public async schedule(req: Request, res: Response) {
    try {
      const { band_id, week_day, start_time, end_time } = req.body;
      const token = req.headers.authorization as string;
      const show = {
        band_id,
        week_day,
        start_time,
        end_time,
      };

      await showBusiness.schedule(show, token);

      res.status(200).send({ message: "scheduled show" });
    } catch (error) {
      res.status(error.statusCode || 400).send({ erro: error.message });
    }
  }

  public async getShowByDay(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const day = req.body.day;
      const result = await showBusiness.getShowByDay(day, token);
      res.status(201).send({ result });
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }
}
