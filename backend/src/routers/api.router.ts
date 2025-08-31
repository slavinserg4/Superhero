import express from "express";

import { superheroRouter } from "./superhero.router";

const apiRouter = express.Router();

apiRouter.use("/superheroes", superheroRouter);

export { apiRouter };
