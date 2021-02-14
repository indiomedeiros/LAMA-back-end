export class Shows {
  constructor(
    public readonly id: string,
    public readonly week_day: string,
    public readonly start_time: number,
    public readonly end_time: number,
    public readonly band_id: string
  ) {}
}

export class Band {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly music_genre: string,
    public readonly responsible: string
  ) {}
}

export interface BandInputDTO {
  name: string;
  music_genre: string;
  responsible: string;
}

export interface CreateBandInputDTO extends BandInputDTO {
    token: string
}

export interface GetBandByIdInputDTO {
    id: string,
    token: string
}
 

export interface DetailsInputDTO {
  id: string;
  name: string;
}
