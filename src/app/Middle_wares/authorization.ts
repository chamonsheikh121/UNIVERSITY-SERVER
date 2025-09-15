import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catch_async';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUser_Role } from '../modules/user/user.interface';

const authorizer = (...required_roles: TUser_Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'you are not authorized !!! ',
      );
    }

    const decoded = jwt.verify(
      token,
      config.JWT_ACCESS_SECRET as string,
    ) as JwtPayload;
    const role = (decoded as JwtPayload).role;
    if (required_roles && !required_roles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'you are not authorized !!! ',
      );
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default authorizer;
