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