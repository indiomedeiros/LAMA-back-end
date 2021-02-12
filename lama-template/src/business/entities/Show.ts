export class Show {
  constructor(
    public readonly id: string,
    public readonly band_id: string,
    public readonly week_day: string,
    public readonly start_time: number,
    public readonly end_time: number
  ) {}
}

export enum SHOW_ROLE {
  SEXTA = "SEXTA",
  SABADO = "SABADO",
  DOMINGO = "DOMINGO",
}
