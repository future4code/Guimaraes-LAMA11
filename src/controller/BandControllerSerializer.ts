import { inputShowByDay, ShowInput } from './../model/bandTypes';

import {InvalidDate, InvalidHours, InvalidRoleBand, MissingParameters, MissingParametersToken } from "../error/CustomError";
import { BandInput, inputBandById } from "../model/bandTypes";
import { UserRole } from '../model/userTypes';

export const validateBandInput = (input: BandInput): void => {
  if (!input.name || !input.musicGenre || !input.responsible  ||! input.role) {
    throw new MissingParameters();
  } else if (!input.token) {
    throw new MissingParametersToken();
  }
};

export const validateInputBandById = (input: inputBandById): void => {
  if (!input.idBand) {
    throw new MissingParameters();
  } else if (!input.token) {
    throw new MissingParametersToken();
  }
};


export const validateRoleBand = (role: UserRole): void => {
  if (role.toUpperCase() !== UserRole.ADMIN) {
    throw new InvalidRoleBand();
  }
};

export const validateShowInput = (input: ShowInput): void => {
  if (!input.idBand || !input.weekDay || !input.startTime || !input.endTime) {
    throw new MissingParameters();
  } else if (!input.token) {
    throw new MissingParametersToken();
  }
};

export const validateShowBand = (role: UserRole): void => {
  if (role.toUpperCase() !== UserRole.ADMIN) {
    throw new InvalidRoleBand();
  }
};

export const validateInputShowByDay = (input: inputShowByDay): void => {
  if (! input.day) {
    throw new MissingParameters();
  } else if (!input.token) {
    throw new MissingParametersToken();
  }
};


export const validateDateShow = (
  weekDay: string,
  starTime: string, 
  endTime: string
  ): void => {

  const initialTime = 08 
  const finalTime = 23

  let newStartTime = starTime.split(":")
  let newEndTime = endTime.split(":")
  
  if(weekDay.toLowerCase() !== String("friday") && weekDay.toLowerCase() !== String("saturday") && weekDay.toLowerCase()!== String("sunday")){
    throw new InvalidDate(); 
  }
  if( Number(starTime) < initialTime || Number(endTime) > finalTime || newStartTime[1] !== "00" || newEndTime[1] !== "00"){
    throw new InvalidHours();
  }
 

};