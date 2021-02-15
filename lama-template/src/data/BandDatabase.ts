import { Band } from "../business/entities/Band";
import { BaseDatabase } from "./BaseDatabase";
import { TablesDatabase } from "./TablesDatabase";

export class BandDatabase extends BaseDatabase {

  private static toBandModel(band: Band): Band {
    const { id, name, music_genre, responsible } = band;

    return new Band(id, name, music_genre, responsible);
  }

  public async createBand(band: Band): Promise<void> {
    try {
      await BaseDatabase.connection.insert(band).into(TablesDatabase.lama_bands);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getBand(id: string): Promise<Band> {
    try {
      const result = await BaseDatabase.connection
        .select("*")
        .from(TablesDatabase.lama_bands)
        .where({id});
        
      return BandDatabase.toBandModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
