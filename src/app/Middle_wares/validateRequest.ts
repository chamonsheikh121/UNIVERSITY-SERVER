import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { catchAsync } from '../utils/catch_async';

const validate_request = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export default validate_request;
