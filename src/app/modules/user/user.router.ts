import express, { NextFunction, Request, Response } from 'express';
import { user_controllers } from './user.controller';
import { create_student_zod_validation_schema } from '../student/student.zod_validation';
import { AnyZodObject } from 'zod';

const router = express.Router();

const validate_request = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};

router.post(
  '/create-user',
  validate_request(create_student_zod_validation_schema),
  user_controllers.createStudent,
);

export const user_router = router;
