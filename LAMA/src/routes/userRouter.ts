import { UserDatabase } from "./../data/UserDatabase";
import { UserBusiness } from "./../business/UserBusiness";
import express from "express";
import { UserController } from "../controller/UserController";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { MailDataBase } from "../services/MailTransporter";

export const userRouter = express.Router();

const hashManager = new HashManager();
const authenticator = new Authenticator();
const idGenerator = new IdGenerator();
const emailConfirmation = new MailDataBase();
const userDB = new UserDatabase();

const userBusiness = new UserBusiness(
  userDB,
  hashManager,
  authenticator,
  idGenerator,
  emailConfirmation
);

const userController = new UserController(userBusiness);

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);