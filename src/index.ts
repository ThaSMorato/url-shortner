import { URLController } from "controller/URLController";
import { MongoConnection } from "database/MongoConnection";
import express from "express";

const api = express();

api.use(express.json());

const PORT = 5000;

const database = new MongoConnection();
database.connect();

const urlController = new URLController();

api.post("/shorten", urlController.shorten);
api.get("/:hash", urlController.redirect);

api.listen(PORT, () => console.log(`listening on port ${PORT}`));
