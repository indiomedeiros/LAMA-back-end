import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandInputDTO } from "../business/entities/Band";
import { Authenticator } from "../business/service/Authenticatior";
import { IdGenerator } from "../business/service/IdGenerator";
import { BandDatabase } from "../data/BandDatabase";

const bandBusiness = new BandBusiness(
  new Authenticator(),
  new IdGenerator(),
  new BandDatabase()
);

export class BandController {
  public async bandSignup(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const { name, music_genre, responsible } = req.body;

      const band: BandInputDTO = {
        name,
        music_genre,
        responsible,
      };

      await bandBusiness.createBand(band, token);
      res.status(201).send({ message: "Band created!" });
    } catch (error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }

  public async getBandById(req: Request, res: Response) {
    try{
      const token = req.headers.authorization as string;
      const band = await bandBusiness.getBandById(req.params.id, token);

      res.status(200).send({ message: "Success!", band });
    }
    catch(error) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }
}
