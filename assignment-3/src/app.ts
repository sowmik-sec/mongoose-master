/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";

app.use(express.json());
app.use(cors());

// application routes

const getAController = (req: Request, res: Response) => {
  res.send("Hello World!");
  // Promise.reject();
};

app.use("/", getAController);

export default app;
