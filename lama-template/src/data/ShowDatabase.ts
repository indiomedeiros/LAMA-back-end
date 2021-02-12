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

    public async selectShowByDay (week_day: string):Promise<Show[]>{
        try {
        const result = await BaseDatabase.connection
        .select("*")
        .from(ShowDatabase.tableName)
        .where({week_day})  

        return result
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}