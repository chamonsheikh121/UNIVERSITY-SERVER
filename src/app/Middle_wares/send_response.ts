import { Response } from 'express';
import  HttpStatus  from 'http-status';

type TResopnseData<T> = {
  message: string;
  data: T;
};

export const send_response = <T>(res: Response, data: TResopnseData<T>) => {

    const status_code = HttpStatus.OK;
    const success = true;

  res.status(status_code).json({
    success: success,
    message: data.message,
    data: data.data,
  });
};
