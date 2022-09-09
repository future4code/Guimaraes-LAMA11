import { inputShowByDay, ShowInput } from './../model/bandTypes';
import { BandBusiness } from "../business/BandBusiness";
import { BandInput, inputBandById } from "../model/bandTypes";
import { Request, Response } from "express";
import { validateBandInput, validateInputBandById, validateInputShowByDay, validateShowInput } from "./BandControllerSerializer";

export class BandController {

  constructor(  private bandBusiness: BandBusiness) {
  }
  public createBand = async (req: Request, res: Response): Promise<void> => {
    try {
      const message = "SUCESS, BAND CREATED";

      const input: BandInput = {
        name: req.body.name,
        musicGenre: req.body.musicGenre,
        responsible: req.body.responsible,
        role: req.body.role,
        token: req.headers.authorization as string,    
      };

      // validação de parâmetros input
      validateBandInput(input);

      await this.bandBusiness.createBand(input);

      res.status(201).send(message);
    } catch (error: any) {
      res.status(error.status || 400).send(error.message);
    }
  };

  public getBandById = async (req: Request, res: Response): Promise<void> => {
    try {
      const input:inputBandById  = {
        idBand: req.params.id as string,
        token: req.headers.authorization as string,
      };
      
      validateInputBandById(input)

      const band = await this.bandBusiness.getBandById(input);

      res.status(200).send(band);
    } catch (error: any) {
      res.status(error.status || 400).send(error.message);
    }
  };

  public createShow = async (req: Request, res: Response): Promise<void> => {
    try {
      const message = "SUCESS, SHOW CREATED";

      const input:ShowInput  = {
        weekDay: req.body.weekDay,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        idBand: req.body.idBand,
        token: req.headers.authorization as string,    
      };  
      // validação de parâmetros input
      validateShowInput(input)

      await this.bandBusiness.createShow(input);

      res.status(201).send(message);
    } catch (error: any) {
      res.status(error.status || 400).send(error.message);
    }
};
public getShows = async (req: Request, res: Response): Promise<void> => {
  try {
    const input: inputShowByDay = {
      day: req.params.day as string,
      token: req.headers.authorization as string,
    };
    
    validateInputShowByDay(input)

    const shows = await this.bandBusiness.getShowsByDay(input);

    res.status(200).send(shows);
  } catch (error: any) {
    res.status(error.status || 400).send(error.message);
  }
};
}