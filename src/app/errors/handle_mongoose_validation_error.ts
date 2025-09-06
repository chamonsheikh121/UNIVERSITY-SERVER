import mongoose from 'mongoose';
import { TErrorSource, TGeneric_error_response } from '../interface/error';

const validation_error_handler = (
  err: mongoose.Error.ValidationError,
): TGeneric_error_response => {
  const errorSource: TErrorSource = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );

  const status_code = 400;
  return {
    status_code,
    errorSource,
    message: 'validation error',
  };
};

export default validation_error_handler;
