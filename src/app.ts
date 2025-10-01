/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, { Request, Response } from 'express';
import cooke_parser from 'cookie-parser';

import { global_error_handler } from './app/Middle_wares/global_error_handler';
import { not_found_route } from './app/Middle_wares/not_found_route';
import router from './app/routes';
const app = express();

app.use(express.json());
app.use(express.text());
app.use(cooke_parser());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }),
);

//application routes

app.use('/api/v1', router);

// app.use('/api/v1/courses', courseRouter);

// global error handler

app.get('/', async (req: Request, res: Response) => {
  // Promise.reject()
  res.send('Hello World! Server is working!');
});

app.use(not_found_route);

app.use(global_error_handler);

export default app;
