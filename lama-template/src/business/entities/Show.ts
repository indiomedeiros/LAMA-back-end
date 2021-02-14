import { CustomError } from "../errors/CustomError";

export class Show {
  constructor(
    public readonly id: string,
    public readonly band_id: string,
    public readonly week_day: SHOW_ROLE,
    public readonly start_time: number,
    public readonly end_time: number
  ) {}

  static stringToshowRole(input: string): SHOW_ROLE {
    switch (input) {
      case "FRIDAY":
        return SHOW_ROLE.FRIDAY;
      case "SATURDAY":
        return SHOW_ROLE.SATURDAY;
      case "SUNDAY":
        return SHOW_ROLE.SUNDAY;
      default:
        throw new CustomError(422, "Invalid show role");
    }
  }

  static roleToString(input: SHOW_ROLE): string {
    if (input === SHOW_ROLE.SATURDAY) {
      return "SATURDAY";
    } else if (input === SHOW_ROLE.FRIDAY) {
      return "FRIDAY";
    } else {
      return "SUNDAY";
    }
  }
}

export enum SHOW_ROLE {
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}
