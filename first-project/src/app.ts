import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';

app.use(express.json());
app.use(cors());

const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getAController);
export default app;
