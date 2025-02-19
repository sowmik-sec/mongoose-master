/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// application routes
app.use('/api/v1', router);

// const getAController = (req: Request, res: Response) => {
//   res.send('Hello World!');
// Promise.reject();
// };

// app.use('/', getAController);

app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
