import { Band, BandInputDTO, CreateBandInputDTO, GetBandByIdInputDTO } from "./entities/Band";
import { IdGenerator } from "./service/IdGenerator";
import { Authenticator } from "./service/Authenticatior";
import { CustomError } from "./errors/CustomError";
import { BandDatabase } from "../data/BandDatabase";
import { CheckData } from "./errors/CheckData";

export class BandBusiness {
  constructor(
    private authenticator: Authenticator,
    private idGenerator: IdGenerator,
    private bandDatabase: BandDatabase
  ) {}

  public async createBand(createBandInputDTO: CreateBandInputDTO): Promise<void> {
    try {
      const { name, music_genre, responsible, token } = createBandInputDTO;
      const id = this.idGenerator.generateId();
      const result = this.authenticator.getTokenData(token);
      const check = new CheckData();

      check.checkExistenceProperty(name, "name");
      check.checkExistenceProperty(music_genre, "music_genre");
      check.checkExistenceProperty(responsible, "responsible");
      check.checkAuthorization(result.role!);

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

  public async getBandById(getBandByIdInputDTO: GetBandByIdInputDTO): Promise<Band> {
    try {
      const {id, token} = getBandByIdInputDTO
      const tokenResult = this.authenticator.getTokenData(token);
      const queryResult = await this.bandDatabase.getBand(id);
      const check = new CheckData();
      
      check.checkAuthorization(tokenResult.role!);
      check.checkExistenceObject(queryResult, "Post not found");

      const band: Band = {
        id: queryResult.id,
        name: queryResult.name,
        music_genre: queryResult.music_genre,
        responsible: queryResult.responsible,
      };

      return band;
    } catch (error) {
      throw new CustomError(
        error.statusCode || 400,
        error.sqlMessage || error.message
      );
    }
  }
}
