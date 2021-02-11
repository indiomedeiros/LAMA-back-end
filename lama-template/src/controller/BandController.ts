import { Request, Response } from "express";
import { BandBusiness } from "../bussines/bandBusiness";
import { BandInputDTO } from "../bussines/entities/Band";
import { Authenticator } from "../bussines/service/Authenticatior";
import { IdGenerator } from "../bussines/service/IdGenerator";
import { BandDatabase } from "../data/BandDatabase";

const bandBusiness = new BandBusiness(
  new Authenticator(),
  new IdGenerator(),
  new BandDatabase()
);

export class BandController {
  async bandSignup(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const { name, music_genre, responsible } = req.body;

      const band: BandInputDTO = {
        name,
        music_genre,
        responsible,
      };

      await bandBusiness.createBand(band, token);
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }
}
