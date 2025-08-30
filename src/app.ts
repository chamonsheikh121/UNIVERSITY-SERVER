import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
const app = express();

app.use(express.json());
app.use(express.text());
app.use(cors());

const userRouter = express.Router();
const courseRouter = express.Router();

app.use('/api/v1/users', userRouter);
app.use('/api/v1/courses', courseRouter);

// global error handler

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Hello man I am from global error', error);

  console.log('Im from error', error);
  res.status(404).json({
    success: false,
    message: ' user creation failed',
  });
});

userRouter.post(
  '/create-user',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      res.json({
        success: true,
        message: 'user created successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
);

courseRouter.post('/create-course', (req: Request, res: Response) => {
  const course = req.body;

  res.json({
    success: true,
    message: 'course created successfully',
    data: course,
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Server is working!');
});

export default app;
