/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import { user_router } from './app/modules/user/user.router';
import { student_router } from './app/modules/student/student.router';
import { global_error_handler } from './app/Middle_wares/global_error_handler';
import { not_found_route } from './app/Middle_wares/not_found_route';
import router from './app/routes';
const app = express();

app.use(express.json());
app.use(express.text());
app.use(cors());

//application routes

app.use('/api/v1', router);

// app.use('/api/v1/courses', courseRouter);

// global error handler



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Server is working!');
});

app.use(not_found_route);

app.use(global_error_handler);

export default app;
