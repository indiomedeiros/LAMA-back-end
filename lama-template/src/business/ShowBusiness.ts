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

      if (!result || result.role !== USER_ROLE.ADMIN) {
        throw new CustomError(401, "Not authorized");
      }

      //   if (
      //     week_day !== SHOW_ROLE.SEXTA ||
      //     week_day !== SHOW_ROLE.SABADO ||
      //     week_day !== SHOW_ROLE.DOMINGO
      //   ) {
      //     throw new CustomError(
      //       401,
      //       "Show can only be schedule 'friday', 'saturday' or 'sunday'"
      //     );
      //   }

      if (start_time < 8 && end_time > 23) {
        throw new CustomError(401, "Show can only be schedule from 8 to 23");
      }

      // const outputShow = await this.showDatabase.selectAllShow();
      // console.log(outputShow);
      // const resultOutputShow = outputShow.filter((item:any) => {
      //   return (
      //     item.start_time >= start_time &&
      //     item.end_time <= end_time &&
      //     item.week_day === week_day
      //   );
      // });

      // console.log(resultOutputShow);
      // if (resultOutputShow.length !== 0) {
      //   throw new CustomError(401, "Schedule not available");
      // }
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

      const tokenResult = this.authenticator.getTokenData(token);

      if (!tokenResult || tokenResult.role !== USER_ROLE.ADMIN) {
        throw new CustomError(401, "not authorized");
      }

      const queryResult = await this.showDatabase.selectShowByDay(input);

      if (!queryResult) {
        throw new CustomError(404, "There is no show on this day.");
      }

      return queryResult

      } catch (error) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  }
}
