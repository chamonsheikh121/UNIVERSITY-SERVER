import { Response } from 'express';
import HttpStatus from 'http-status';

<<<<<<< HEAD
type TResopnseData<T,X> = {
=======
type TResponseData<T> = {
>>>>>>> 97fceacc0e558e46f9633e1cd4262c16f2fc1a77
  message: string;
  data: T;
  meta:X
};

<<<<<<< HEAD
export const send_response = <T,X>(res: Response, data: TResopnseData<T,X>) => {
=======
export const send_response = <T>(res: Response, data: TResponseData<T>) => {
>>>>>>> 97fceacc0e558e46f9633e1cd4262c16f2fc1a77
  const status_code = HttpStatus.OK;
  const success = true;

  res.status(status_code).json({
    success: success,
    message: data.message,
    data: data.data,
    meta:data?.meta
  });
};
