import { ShowDatabase } from "../data/ShowDatabase";
import { GetShowByDayInputDTO, ScheduleInputDTO, Show } from "./entities/Show";
import { CheckData } from "./errors/CheckData";
import { CustomError } from "./errors/CustomError";
import { Authenticator } from "./service/Authenticatior";
import { IdGenerator } from "./service/IdGenerator";

export class ShowBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private showDatabase: ShowDatabase
  ) {}
  public async schedule(scheduleInputDTO: ScheduleInputDTO): Promise<void> {
    try {
      const {
        band_id,
        week_day,
        start_time,
        end_time,
        token,
      } = scheduleInputDTO;
      const id = this.idGenerator.generateId();
      const result = this.authenticator.getTokenData(token);
      const startTime = Number(start_time);
      const endTime = Number(end_time);
      const check = new CheckData();

      check.checkExistenceProperty(band_id, "band_id");
      check.checkExistenceProperty(week_day, "week_day");
      check.checkExistenceProperty(startTime, "startTime");
      check.checkExistenceProperty(endTime, "endTime");
      check.checkAuthorization(result.role!);
      check.checkTimeWithinRule(startTime, endTime);
      check.checkDayWeek(week_day);

      const outputShow = await this.showDatabase.checkConcertSchedule(
        week_day,
        start_time,
        end_time
      );

      check.checkArray(outputShow, "requested time / day is busy");

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

  public async getShowByDay(
    getShowByDayInputDTO: GetShowByDayInputDTO
  ): Promise<Show[]> {
    try {
      const { day, token } = getShowByDayInputDTO;
      const check = new CheckData();
      check.checkExistenceProperty(day, "day");
      check.checkDayWeek(day);

      const tokenResult = this.authenticator.getTokenData(token);
      check.checkAuthorization(tokenResult.role!);

      const queryResult = await this.showDatabase.selectByDay(day);
      check.checkExistenceObject(queryResult, "There is no show on this day.");

      return queryResult;
    } catch (error) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  }
}
