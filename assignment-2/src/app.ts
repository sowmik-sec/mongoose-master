import express, { Application } from "express";
export const app: Application = express();

import cors from "cors";

app.use(cors());
app.use(express.json());
