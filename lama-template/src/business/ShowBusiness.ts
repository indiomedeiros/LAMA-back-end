import { ShowDatabase } from "../data/ShowDatabase";
import { SHOW_ROLE, Show } from "./entities/Show";
import { USER_ROLE } from "./entities/User";
import { CustomError } from "./errors/CustomError";
import { Authenticator } from "./service/Authenticatior";
import { IdGenerator } from "./service/IdGenerator";

export class ShowBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private showDatabase: ShowDatabase
  ) {}
  public async schedule(show: any, token: string): Promise<void> {
    try {
      const { band_id, week_day, start_time, end_time } = show;
      const id = this.idGenerator.generateId();
      const result = this.authenticator.getTokenData(token);
      const startTime = Number(start_time);
      const endTime = Number(end_time);

      if(!band_id || !week_day || !startTime || !endTime){
        throw new CustomError(406, "Please provide a 'band_id', 'week_day', 'end time' and 'start time'");
      }

      if (!result || result.role !== USER_ROLE.ADMIN) {
        throw new CustomError(401, "Not authorized");
      }

      if (startTime < 8 || endTime > 23 || startTime >= endTime || !Number.isInteger(startTime) || !Number.isInteger(endTime)) {
        throw new CustomError(401, "Selected time is invalid");
      }

      switch (week_day) {
        case "SEXTA":
          break;
        case "SABADO":
          break;
        case "DOMINGO":
          break;
        default:
          throw new CustomError(422, "Invalid week day");
      }

      const outputShow = await this.showDatabase.checkConcertSchedule(
        week_day,
        start_time,
        end_time
      );
      console.log(outputShow);
      if (outputShow.length !== 0) {
        throw new CustomError(401, "Schedule not available");
      }

      const inputShow: any = {
        id,
        band_id,
        week_day,
        start_time,
        end_time,
      };

      await this.showDatabase.insertShow(inputShow);
      
    } catch (error) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  }

  public async getShowByDay(input: string, token: string) {
    try {
      if (!input) {
        throw new CustomError(400, "Week day must be provided");
      }

      switch (input) {
        case "SEXTA":
          break;
        case "SABADO":
          break;
        case "DOMINGO":
          break;
        default:
          throw new CustomError(422, "Invalid week day");
      }

      const tokenResult = this.authenticator.getTokenData(token);

      if (!tokenResult || tokenResult.role !== USER_ROLE.ADMIN) {
        throw new CustomError(401, "not authorized");
      }

      const queryResult = await this.showDatabase.selectByDay(input);

      if (!queryResult) {
        throw new CustomError(404, "There is no show on this day.");
      }

      return queryResult;
    } catch (error) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  }
}
