import { UserDatabase } from "./../data/UserDatabase";
import express from "express";
import { UserController } from "../controller/UserController";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { UserBusiness } from "../business/UserBusiness";

export const userRouter = express.Router();

const hashManager = new HashManager();
const authenticator = new Authenticator();
const idGenerator = new IdGenerator();
const userDB = new UserDatabase();

const userBusiness = new UserBusiness(
  userDB,
  hashManager,
  authenticator,
  idGenerator,
);

const userController = new UserController(userBusiness);

userRouter.post("/signup", (req, res) => userController.signup(req, res));
userRouter.post("/login", (req, res) => userController.login(req, res));