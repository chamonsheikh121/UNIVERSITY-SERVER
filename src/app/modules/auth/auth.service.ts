import AppError from '../../errors/AppError';
import UserModel from '../user/user.model';
import { TAuth_user } from './auth.interface';
import HttpStatus from 'http-status';
import bcrypt from 'bcrypt';

const login_user_to_db = async (payload: TAuth_user) => {
  const id = payload.id;

  const is_user_exist = await UserModel.findOne({ id });
  console.log(is_user_exist);
  if (!is_user_exist) {
    throw new AppError(HttpStatus.NOT_FOUND, 'user not found');
  }

  const is_blocked = is_user_exist.status == 'blocked';
  if (is_blocked) {
    throw new AppError(HttpStatus.NOT_FOUND, 'This user already blocked');
  }
  const is_deleted = is_user_exist.isDeleted;
  if (is_deleted) {
    throw new AppError(HttpStatus.NOT_FOUND, 'This user already deleted');
  }

  //validate bcrypt password
  const is_password_match = await bcrypt.compare(
    payload.password,
    is_user_exist.password,
  );
  if (!is_password_match) {
    throw new AppError(HttpStatus.NOT_FOUND, 'password doesnt match');
  }



};

export const auth_services = {
  login_user_to_db,
};
