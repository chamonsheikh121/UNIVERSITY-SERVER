import { Response } from 'express';
import HttpStatus from 'http-status';

type TResopnseData<T,X> = {
  message: string;
  data: T;
  meta:X
};

export const send_response = <T,X>(res: Response, data: TResopnseData<T,X>) => {
  const status_code = HttpStatus.OK;
  const success = true;

  res.status(status_code).json({
    success: success,
    message: data.message,
    data: data.data,
    meta:data?.meta
  });
};
