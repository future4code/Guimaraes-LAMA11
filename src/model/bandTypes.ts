import { UserRole } from "./userTypes";

  export interface BandInput{
    name: string;
    musicGenre: string;
    responsible: string;
    token: string;
    role: UserRole
  };
  
  export interface BandDTO {
    id: string;
    name: string;
    musicGenre: string;
    responsible: string;
  }
  
export interface inputBandById{
  idBand: string,
  token: string
}

export interface ShowInput {
  idBand: string;
  weekDay: string;
  startTime: string;
  endTime: string;
  token: string
}
export interface ShowDTO {
  id: string;
  idBand: string;
  weekDay: string;
  startTime: string;
  endTime: string;
}

export interface inputShowByDay{
  day: string,
  token: string
}