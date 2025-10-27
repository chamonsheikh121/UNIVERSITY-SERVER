/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import { TErrorSource } from '../interface/error';
import { zodErrorHandler } from '../errors/handleZodError';
import validation_error_handler from '../errors/handle_mongoose_validation_error';
import cast_error_handler from '../errors/handle_mongoose_cast_Error';
import duplicate_error_handler from '../errors/handle_duplication_error';
import AppError from '../errors/AppError';
import { token_expired_error } from '../errors/token_expired_error';

export const global_error_handler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  // default
  let statusCode = 500;
  let message = 'Internal Server Error';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Internal Server Error',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = zodErrorHandler(error);
    statusCode = simplifiedError.status_code;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (error?.name == 'ValidationError') {
    const simplifiedError = validation_error_handler(error);
    statusCode = simplifiedError.status_code;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (error?.name == 'CastError') {
    const simplifiedError = cast_error_handler(error);
    statusCode = simplifiedError.status_code;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (error?.errorResponse?.code == 11000) {
    const simplifiedError = duplicate_error_handler(error);
    statusCode = simplifiedError.status_code;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (error?.name == 'TokenExpiredError') {
    const simplifiedError = token_expired_error(error);
    statusCode = simplifiedError.status_code;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (error instanceof AppError) {
    statusCode = error.status_code;
    message = error.message;
    errorSource = [
      {
        path: '',
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorSource = [
      {
        path: '',
        message: error.message,
      },
    ];
  }

  // console.log('error', error);

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.NODE_ENV == 'development' ? error?.stack : null,
  });
};
