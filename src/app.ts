import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { StudentRouter } from './app/modules/student/student.router';
const app = express();

app.use(express.json());
app.use(express.text());
app.use(cors());

//application routes

app.use('/api/v1/students', StudentRouter);
// app.use('/api/v1/courses', courseRouter);

// global error handler

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Hello man I am from global error', error);

  console.log('Im from error', error);
  res.status(404).json({
    success: false,
    message: ' user creation failed',
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Server is working!');
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
