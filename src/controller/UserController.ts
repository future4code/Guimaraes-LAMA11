import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { LoginInputDTO, UserInputDTO } from "../model/userTypes";
import { validateLoginInput, validateUserInput } from "./UserControllerSerializer";

export class UserController {
  constructor(private userBusiness: UserBusiness ) {}
  async signup(req: Request, res: Response) {
    try {

      const message = "SUCESS, USER CREATED";

      const input: UserInputDTO = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
      };

 validateUserInput(input)

      
      const token = await this.userBusiness.signup(input);

      res.status(201).send({message, token });
    } catch (error: any) {
      res.status(error.status || 400).send(error.message);
    }

    await BaseDatabase.destroyConnection();
  }

  async login(req: Request, res: Response) {
    try {
      const loginData: LoginInputDTO = {
        email: req.body.email,
        password: req.body.password,
        token: req.headers.authorization as string,
      };

      const newToken = await this.userBusiness.login(loginData);

      validateLoginInput(loginData);

      res.status(200).send({ newToken });
    } catch (error: any) {
      res.status(error.status || 400).send(error.message);
    }

    await BaseDatabase.destroyConnection();
  }
}
