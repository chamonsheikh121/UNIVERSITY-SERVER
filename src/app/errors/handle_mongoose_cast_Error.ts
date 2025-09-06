import mongoose from 'mongoose';
import { TErrorSource, TGeneric_error_response } from '../interface/error';

const cast_error_handler = (
  err: mongoose.Error.CastError,
): TGeneric_error_response => {
  const errorSource: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const status_code = 400;
  return {
    status_code,
    message: 'cast error',
    errorSource,
  };
};

export default cast_error_handler;
