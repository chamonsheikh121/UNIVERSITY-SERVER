/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { NextFunction, Request, Response } from 'express';

export const global_error_handler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('error message:', error.message, 'error is :', error);

  const statusCode = error.satus_code || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
