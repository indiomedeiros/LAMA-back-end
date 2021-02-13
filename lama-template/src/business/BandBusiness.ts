import { Band, BandInputDTO } from "./entities/Band";
import { IdGenerator } from "./service/IdGenerator";
import { USER_ROLE } from "./entities/User";
import { Authenticator } from "./service/Authenticatior";
import { CustomError } from "./errors/CustomError";
import { BandDatabase } from "../data/BandDatabase";

export class BandBusiness {
  constructor(
    private authenticator: Authenticator,
    private idGenerator: IdGenerator,
    private bandDatabase: BandDatabase
  ) {}

  public async createBand(band: BandInputDTO, token: string): Promise <void> {
    try {
      const { name, music_genre, responsible } = band;
      const id = this.idGenerator.generateId();
      const result = this.authenticator.getTokenData(token);

      if(!name|| !music_genre || !responsible){
        throw new CustomError(406, "Please provide a 'name', 'music_genre' and 'responsible");
      }

      if (!result || result.role !== USER_ROLE.ADMIN) {
        throw new CustomError(401, "not authorized");
      }
      const inputBand: Band = {
        id,
        name,
        music_genre,
        responsible,
      };

      await this.bandDatabase.createBand(inputBand);
    } catch (error) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  }

  public async getBandById(id: string, token: string): Promise<Band> {
    try {
      const tokenResult = this.authenticator.getTokenData(token);

      if (!tokenResult || tokenResult.role !== USER_ROLE.ADMIN) {
        throw new CustomError(401, "not authorized");
      }

      const queryResult = await this.bandDatabase.getBand(id);
      if (!queryResult) {
        throw new CustomError(404, "Post not found");
      }

      const band: Band = {
        id: queryResult.id,
        name:queryResult.name,
        music_genre:queryResult.music_genre,
        responsible:queryResult.responsible
      };

      return band;
    } catch (error) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  }

 
}
