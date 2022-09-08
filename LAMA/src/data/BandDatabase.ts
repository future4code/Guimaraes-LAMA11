import { BandDTO } from './../model/bandTypes';
import { BandRepository } from './../business/BandRepository';
import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from '../error/CustomError';

export class BandDatabase extends BaseDatabase implements BandRepository {
  private bandTable = "NOME_TABELA_BANDAS";

  public createBand = async (band: BandDTO): Promise<void> => {
    try {
      await this.getConnection()
        .insert({
          id: band.id,
          name: band.name,
          music_genre: band.musicGenre,
       responsible: band.responsible})
        .into(this.bandTable);
    } catch (error: any) {
      throw new CustomError(500, error.sqlMessage);
    }
  };

  public getBandById = async (idBand: string): Promise<BandDTO> => {
    try {
      const band = await this.getConnection()(this.bandTable)
        .select(
          "id",
          "name",
          "music_genre as musicGenre",
          "responsible"
        )
        .where("id", idBand);
      return band[0];
    } catch (error: any) {
      throw new CustomError(500, error.sqlMessage);
    }
  };
}