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
      case "SEXTA":
        return SHOW_ROLE.SEXTA;
      case "SABADO":
        return SHOW_ROLE.SABADO;
      case "DOMINGO":
        return SHOW_ROLE.DOMINGO;
      default:
        throw new CustomError(422, "Invalid show role");
    }
  }

  static roleToString(input: SHOW_ROLE): string {
    if (input === SHOW_ROLE.SABADO) {
      return "SABADO";
    } else if (input === SHOW_ROLE.SEXTA) {
      return "SEXTA";
    } else {
      return "DOMINGO";
    }
  }
}

export enum SHOW_ROLE {
  SEXTA = "SEXTA",
  SABADO = "SABADO",
  DOMINGO = "DOMINGO",
}

