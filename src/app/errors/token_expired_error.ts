import { TErrorSource, TGeneric_error_response } from '../interface/error';
import { TokenExpiredError } from 'jsonwebtoken';

export const token_expired_error = (
  err: TokenExpiredError,
): TGeneric_error_response => {
  const errorSource: TErrorSource = [
    {
      path: 'token',
      message: 'Your access token has expired. Please log in again',
    },
  ];

  const status_code = 401;
  return {
    status_code,
    message: err.message,
    errorSource,
  };
};
