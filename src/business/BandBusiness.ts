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
  validateRoleBand,
  validateShowBand,
} from "../controller/BandControllerSerializer";
import { BandIdNotFound, ShowsNotFound } from "../error/CustomError";
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

    const show = new Show(idBand, weekDay, startTime, endTime, );

    const tokenData = this.authenticator.getTokenData(token);

    //Só usuários ADMIN podem marcar shows
    validateShowBand(tokenData.role);

    const id: string = this.idGenerator.generateId();

    const newShow: ShowDTO = {
      id,
      idBand: show.getIdBand(),
      weekDay: show.getDay(),
      startTime: show.getHourStart(),
      endTime: show.getHourFinal()
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
