import { USER_ROLE } from "../entities/User";
import { CustomError } from "./CustomError";

export class CheckData {
  public checkArray = (array: any, message: string) => {
    if (array.length !== 0) {
      throw new CustomError(401, message);
    }
  };

  public checkDayWeek = (DayWeek: string) => {
    switch (DayWeek) {
      case "FRIDAY":
        break;
      case "SATURDAY":
        break;
      case "SUNDAY":
        break;
      default:
        throw new CustomError(
          422,
          `${DayWeek} it is not a valid day. Only FRIDAY, SATURDAY or SUNDAY days in capital letters are accepted`
        );
    }
  };

  public checkEmailFormat = (email: string) => {
    this.checkExistenceProperty(email, "email");
    if (email.indexOf("@") === -1) {
      throw new CustomError(
        406,
        "check the format of the 'email' property, @ is required"
      );
    }
  };

  public checkAuthorization = (roleAuthorization: string) => {
    if (!roleAuthorization || roleAuthorization !== USER_ROLE.ADMIN) {
      throw new CustomError(401, "Not authorized");
    }
  };

  public checkTimeWithinRule = (startTime: number, endTime: number) => {
    if (
      startTime < 8 ||
      endTime > 23 ||
      startTime >= endTime ||
      !Number.isInteger(startTime) ||
      !Number.isInteger(endTime)
    ) {
      throw new CustomError(401, "Select a time between 8 and 23 hours");
    }
    if (!Number.isInteger(startTime) || !Number.isInteger(endTime)) {
      throw new CustomError(401, "only whole numbers are allowed");
    }
  };

  public checkExistenceProperty = (reqPropety: any, propretyName: string) => {
    if (!reqPropety || reqPropety === undefined) {
      throw new CustomError(406, `'${propretyName}' not found`);
    }
  };

  public checkExistenceObject = (reqObject: any, message: string) => {
    if (!reqObject || reqObject === undefined ) {
      throw new CustomError(404, `'${message}'`);
    }
  };

  public checkPasswordFormat = (password: string) => {
    this.checkExistenceProperty(password, "password");
    if (password.length < 6) {
      throw new CustomError(
        406,
        " is password required whith minimum 6 caracteres"
      );
    }
  };
}
