import { InvalidRole, MissingParameters, MissingParametersLogin, MissingParametersToken } from "../error/CustomError";
import { LoginInputDTO, UserInputDTO, UserRole } from "../model/userTypes";

export const validateUserInput = (input: UserInputDTO): void => {
  if (!input.name || !input.email || !input.password || !input.role) {
    console.log("input ==>", input)
    throw new MissingParameters();
  }
};

export const validateLoginInput = (input: LoginInputDTO): void => {
  if (!input.email || !input.password) {
    throw new MissingParametersLogin();
  } else if (!input.token) {
    throw new MissingParametersToken();
  }
};

export const validateRole = (role: UserRole): void => {
    if (role !== UserRole.NORMAL && role !== UserRole.ADMIN) {
      throw new InvalidRole();
    }
  };
  