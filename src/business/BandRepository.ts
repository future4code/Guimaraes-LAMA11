import { BandDTO } from "../model/bandTypes";

export interface BandRepository {
  createBand(band: BandDTO): Promise<void>;
  getBandById(idBand: string): Promise<BandDTO>;
}
