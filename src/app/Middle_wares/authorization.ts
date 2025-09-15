import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catch_async';
import AppError from '../errors/AppError';
import HttpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUser_Role } from '../modules/user/user.interface';
import UserModel from '../modules/user/user.model';

const authorizer = (...required_roles: TUser_Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new AppError(
        HttpStatus.UNAUTHORIZED,
        'you are not authorized !!! ',
      );
    }

    const decoded = jwt.verify(
      token,
      config.JWT_ACCESS_SECRET as string,
    ) as JwtPayload;
    const { id, role, iat, exp } = decoded;

    const user = await UserModel.is_user_exist_by_custom_id(id);
    if (!user) {
      throw new AppError(HttpStatus.NOT_FOUND, 'user not found');
    }
    if (user.status == 'blocked') {
      throw new AppError(HttpStatus.NOT_FOUND, 'This user already blocked');
    }
    if (user.isDeleted) {
      throw new AppError(HttpStatus.NOT_FOUND, 'This user already deleted');
    }

    const is_invalid_token =
      user?.last_pass_changed_at &&
      UserModel.last_login_and_pass_update_comparision(
        user.last_pass_changed_at,
        iat as number,
      );
      
    if (is_invalid_token) {
      throw new AppError(
        HttpStatus.UNAUTHORIZED,
        'you are not authorized  !!! ',
      );
    }
    if (required_roles && !required_roles.includes(role)) {
      throw new AppError(
        HttpStatus.UNAUTHORIZED,
        'you are not authorized !!! ',
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default authorizer;
