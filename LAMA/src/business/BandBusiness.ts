import { BandDTO, BandInput, inputBandById } from "../model/bandTypes";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { BandRepository } from "./BandRepository";
import { Band } from "../model/Band";
import { validateRoleBand } from "../controller/BandControllerSerializer";
import { BandIdNotFound } from "../error/CustomError";

  export class BandBusiness {
    constructor(
      private bandDB: BandRepository,
      private authenticator: Authenticator,
      private idGenerator: IdGenerator
    ) {}
    public createBand = async (input: BandInput): Promise<void> => {
      const { name, musicGenre, responsible, token, role } = input;
  
      const band = new Band( name, musicGenre, responsible);
  
      const tokenData = this.authenticator.getTokenData(token);
   
      validateRoleBand(tokenData.role )
 
      const id: string = this.idGenerator.generateId();
  
      const newBand: BandDTO = {
        id,
        name: band.getName(),
        musicGenre: band.getMusicGenre(),
        responsible: band.getResponsible(),
      };
  
      await this.bandDB.createBand(newBand);
    };
  
    public getBandById = async (input:inputBandById): Promise<BandDTO> => {
      //aqui sem deixar como any gera um erro
  
      this.authenticator.getTokenData(input.token);
  
      const band = await this.bandDB.getBandById(input.idBand);
  
      if (!band) {
        throw new BandIdNotFound();
      }
      return band;
    };
}