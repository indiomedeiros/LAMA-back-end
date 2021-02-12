import { BaseDatabase } from "./BaseDatabase";
import { Show } from "../business/entities/Show"


export class ShowDatabase extends BaseDatabase {
    private static tableName = "lama_shows"

    private static toShowModel (show: Show):Show {
        return new Show(
            show.id,
            show.band_id,
            show.week_day, 
            show.start_time, 
            show.end_time
        )
    }

    public async insertShow (show: Show): Promise<void> {
        try {
            await BaseDatabase.connection
            .insert(show)
            .into(ShowDatabase.tableName)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
    // public async selectShow (start_time: number, end_time: number, week_day:string ):Promise<any>{
    //     try {
    //     const result =   await BaseDatabase.connection.raw(`
    //     SELECT * FROM ${ShowDatabase.tableName}
    //     WHERE week_day = '${week_day}' AND start_time >= ${start_time} OR end_time <= ${end_time};
    //     `)
               
    //     return result[0]
        
    //     } catch (error) {
    //         throw new Error(error.sqlMessage || error.message)
    //     }
    // }

    public async selectAllShow ():Promise<any>{
        try {
        const result = await BaseDatabase.connection
        .select("*")
        .from(ShowDatabase.tableName)
               
        return result
        
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}