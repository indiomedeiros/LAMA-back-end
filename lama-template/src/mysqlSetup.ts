import { BaseDatabase } from "./data/BaseDatabase";
import { TablesDatabase } from "./data/TablesDatabase";
import { PopulationUsers } from "./populationTableUser";

class CreateTables extends BaseDatabase {
  public createTables = async (): Promise<void> => {
    try {
      await BaseDatabase.connection.raw(`
        CREATE TABLE ${TablesDatabase.lama_bands} (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            music_genre VARCHAR(255) NOT NULL,
            responsible VARCHAR(255) UNIQUE NOT NULL 
            );
        
        CREATE TABLE  ${TablesDatabase.lama_shows} (
            id VARCHAR(255) PRIMARY KEY,
            week_day VARCHAR(255) NOT NULL,
            start_time INT NOT NULL,
            end_time INT NOT NULL,
            band_id VARCHAR(255) NOT NULL,
            FOREIGN KEY(band_id) REFERENCES lama_bands(id)
            );
        
        CREATE TABLE ${TablesDatabase.lama_users} (
            id VARCHAR(255) PRIMARY KEY,
            name varchar(255) NOT NULL,
            email varchar(255) NOT NULL UNIQUE,
            password varchar(255) NOT NULL,
            role VARCHAR(255)  DEFAULT "NORMAL" NOT NULL
            );
        
        `);
      console.log("Tables have been created!");
      console.log(
        "Users table has been created. You have two users, ADMIN and NORMAL"
      );
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}

const tables = new CreateTables();
const population = new PopulationUsers();
tables.createTables();
population.fillTablesUsers();
