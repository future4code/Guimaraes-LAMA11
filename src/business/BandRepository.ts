import { BandDTO, ShowDTO } from "../model/bandTypes";

export interface BandRepository {
  createBand(band: BandDTO): Promise<void>;
  getBandById(idBand: string): Promise<BandDTO>;
  createShow(show: ShowDTO): Promise<void>;
  getShowsByDay(weekDay: string): Promise<ShowDTO[]>;

}
