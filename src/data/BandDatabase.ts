import { BandDTO, ShowDTO } from "./../model/bandTypes";
import { BandRepository } from "./../business/BandRepository";
import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../error/CustomError";

export class BandDatabase extends BaseDatabase implements BandRepository {
  private bandTable = "NOME_TABELA_BANDAS";
  private showTable = "NOME_TABELA_SHOWS";

  public createBand = async (band: BandDTO): Promise<void> => {
    try {
      await this.getConnection()
        .insert({
          id: band.id,
          name: band.name,
          music_genre: band.musicGenre,
          responsible: band.responsible,
        })
        .into(this.bandTable);
    } catch (error: any) {
      throw new CustomError(500, error.sqlMessage);
    }
  };

  public getBandById = async (idBand: string): Promise<BandDTO> => {
    try {
      const band = await this.getConnection()(this.bandTable)
        .select("id", "name", "music_genre as musicGenre", "responsible")
        .where("id", idBand);
      return band[0];
    } catch (error: any) {
      throw new CustomError(500, error.sqlMessage);
    }
  };

  public createShow = async (show: ShowDTO): Promise<void> => {
    try {
      await this.getConnection()
        .insert({
          id: show.id,
          week_day: show.weekDay,
          start_time: show.startTime,
          end_time: show.endTime,
          band_id: show.idBand,
        })
        .into(this.showTable);
    } catch (error: any) {
      throw new CustomError(500, error.sqlMessage);
    }
  };

  public getShowsByDay = async (weekDay: string): Promise<ShowDTO[]> => {
    try {
      const show: ShowDTO[]= await this.getConnection()(`${this.bandTable} as band`)
        .select("band.name as bandName", "band.music_genre as musicGenre")
        .join("NOME_TABELA_SHOWS as show", "show.band_id", "band.id")
        .orderBy("start_time", "asc")
        .where("week_day", weekDay);
      return show;
    } catch (error: any) {
      throw new CustomError(500, error.sqlMessage);
    }
  };
}
