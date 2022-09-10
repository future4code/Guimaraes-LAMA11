import {
  BandDTO,
  BandInput,
  inputBandById,
  inputShowByDay,
  ShowDTO,
  ShowInput,
} from "../model/bandTypes";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { BandRepository } from "./BandRepository";
import { Band } from "../model/Band";
import {
  validateHours,
  validateRoleBand,
  validateShowBand,
} from "../controller/BandControllerSerializer";
import {
  BandIdNotFound,
    ShowsNotFound,
    ShowAlready
} from "../error/CustomError";
import { Show } from "../model/Show";

export class BandBusiness {
  constructor(
    private bandDB: BandRepository,
    private authenticator: Authenticator,
    private idGenerator: IdGenerator
  ) {}
  public createBand = async (input: BandInput): Promise<void> => {
    const { name, musicGenre, responsible, token, role } = input;

    const band = new Band(name, musicGenre, responsible);

    const tokenData = this.authenticator.getTokenData(token);

    validateRoleBand(tokenData.role);

    const id: string = this.idGenerator.generateId();

    const newBand: BandDTO = {
      id,
      name: band.getName(),
      musicGenre: band.getMusicGenre(),
      responsible: band.getResponsible(),
    };

    await this.bandDB.createBand(newBand);
  };

  public getBandById = async (input: inputBandById): Promise<BandDTO> => {
    //aqui sem deixar como any gera um erro

    this.authenticator.getTokenData(input.token);

    const band = await this.bandDB.getBandById(input.idBand);

    if (!band) {
      throw new BandIdNotFound();
    }
    return band;
  };

  public createShow = async (input: ShowInput): Promise<void> => {
    const { weekDay, startTime, endTime, idBand, token } = input;

    // validação de parâmetros de horas, se não for hora cheia, envio mensagem de erro orientando
    validateHours(weekDay, startTime, endTime);

    const newStartTime = startTime.split(":");
    const newEndTime = endTime.split(":");

    const resultShow = await this.bandDB.getShowsByDay(weekDay);

    for (const show of resultShow) {
      if (show.idBand === idBand) {
        throw new ShowAlready();
      }
    }
/* 
    for (let index = 0; index < resultShow.length; index++) {
      const element = resultShow[index];
      if (element.idBand === idBand) {
        throw new ShowAlready();
      }
    } */

    const show = new Show(idBand, weekDay, newStartTime[0], newEndTime[0]);

    const tokenData = this.authenticator.getTokenData(token);

    //Só usuários ADMIN podem marcar shows
    validateShowBand(tokenData.role);

    const id: string = this.idGenerator.generateId();

    const newShow: ShowDTO = {
      id,
      idBand: show.getIdBand(),
      weekDay: show.getDay(),
      startTime: show.getHourStart(),
      endTime: show.getHourFinal(),
    };

    await this.bandDB.createShow(newShow);
  };

  public getShowsByDay = async (input: inputShowByDay): Promise<any> => {
    //aqui sem deixar como any gera um erro

    this.authenticator.getTokenData(input.token);

    const shows = await this.bandDB.getShowsByDay(input.day);

    if (!shows.length) {
      throw new ShowsNotFound();
    }
    return shows;
  };
}
