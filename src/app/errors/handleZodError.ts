import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, TGeneric_error_response } from '../interface/error';

export const zodErrorHandler = (err: ZodError): TGeneric_error_response => {
  const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const status_code = 400;
  return {
    status_code,
    message: 'zod validation error',
    errorSource,
  };
};
