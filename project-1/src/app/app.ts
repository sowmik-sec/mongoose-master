import express, { Request, Response } from "express";
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello fucker!");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("got data");
});

export default app;
