import { BandBusiness } from './../business/BandBusiness';
import { BandDatabase } from './../data/BandDatabase';
import { BandController } from './../controller/BandController';
import express from "express";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const bandRouter = express.Router();

const authenticator = new Authenticator();
const idGenerator = new IdGenerator();
const bandDB = new BandDatabase

const bandBusiness = new BandBusiness(
  bandDB,
  authenticator,
  idGenerator)

const bandController =  new BandController(bandBusiness)

bandRouter.post("/create", (req, res) => bandController.createBand(req, res)
);

bandRouter.get("/:id", (req, res) => bandController.getBandById(req, res)
);

bandRouter.post("/show", (req, res) => bandController.createShow(req, res)
);

bandRouter.get("/show/:day", (req, res) => bandController.getShows(req, res)
);
