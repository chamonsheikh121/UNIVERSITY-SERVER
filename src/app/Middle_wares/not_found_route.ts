import { Request, Response } from 'express';
import httpStatus from 'http-status';

export const not_found_route = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API not found',
  });
};
