
import {InvalidRoleBand, MissingParameters, MissingParametersToken } from "../error/CustomError";
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
  if (role !== UserRole.ADMIN) {
    throw new InvalidRoleBand();
  }
};
