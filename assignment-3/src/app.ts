/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);

const getAController = (req: Request, res: Response) => {
  res.send("Hello World!");
  // Promise.reject();
};

app.use("/", getAController);

app.use(globalErrorHandler);

export default app;
