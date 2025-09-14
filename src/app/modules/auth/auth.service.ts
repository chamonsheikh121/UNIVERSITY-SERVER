import AppError from '../../errors/AppError';
import UserModel from '../user/user.model';
import { TAuth_user } from './auth.interface';
import HttpStatus from 'http-status';
import bcrypt from 'bcrypt';

const login_user_to_db = async (payload: TAuth_user) => {
  const user = await UserModel.is_user_exist_by_custom_id(payload?.id);
  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, 'user not found');
  }
  if (user.status == 'blocked') {
    throw new AppError(HttpStatus.NOT_FOUND, 'This user already blocked');
  }
  if (user.isDeleted) {
    throw new AppError(HttpStatus.NOT_FOUND, 'This user already deleted');
  }
  if (!(await UserModel.validate_password(payload?.password, user?.password))) {
    throw new AppError(HttpStatus.NOT_FOUND, "password doesn't match");
  }
};

export const auth_services = {
  login_user_to_db,
};
