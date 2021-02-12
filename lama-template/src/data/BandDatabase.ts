import { Band } from "../business/entities/Band";
import { CustomError } from "../business/errors/CustomError";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
  private static tableName = "lama_bands";

  private static toBandModel(band: Band): Band {
    const { id, name, music_genre, responsible } = band;

    return new Band(id, name, music_genre, responsible);
  }

  public async createBand(band: Band): Promise<void> {
    try {
      await BaseDatabase.connection.insert(band).into(BandDatabase.tableName);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getBand(id: string): Promise<Band> {
    try {
      const result = await BaseDatabase.connection
        .select("*")
        .from(BandDatabase.tableName)
        .where({id});
        
      return BandDatabase.toBandModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}