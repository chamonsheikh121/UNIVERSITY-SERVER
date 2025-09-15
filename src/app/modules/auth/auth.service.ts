import config from '../../config';
import AppError from '../../errors/AppError';
import UserModel from '../user/user.model';
import { TAuth_user, TChange_password } from './auth.interface';
import HttpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
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

  const jwt_payload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(
    jwt_payload,
    config.JWT_ACCESS_SECRET as string,
    { expiresIn: 60 * 60 },
  );

  return {
    accessToken,
    need_password_change: user?.need_password_change,
  };
};

const chagne_password_into_db = async (
  decoded_user: JwtPayload,
  payload: TChange_password,
) => {
  const user = await UserModel.is_user_exist_by_custom_id(decoded_user.id);
  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, 'user not found');
  }
  if (user.status == 'blocked') {
    throw new AppError(HttpStatus.NOT_FOUND, 'This user already blocked');
  }
  if (user.isDeleted) {
    throw new AppError(HttpStatus.NOT_FOUND, 'This user already deleted');
  }
  if (
    !(await UserModel.validate_password(payload?.old_password, user?.password))
  ) {
    throw new AppError(HttpStatus.NOT_FOUND, "password doesn't match");
  }

  const hashed_new_password = await bcrypt.hash(
    payload.new_password,
    Number(config.salt_rounds),
  );

  await UserModel.findOneAndUpdate(
    {
      id: decoded_user.id,
      role: decoded_user.role,
    },
    {
      password: hashed_new_password,
      need_password_change: false,
      last_pass_changed_at: new Date(),
    },
  );

  return null;
};

export const auth_services = {
  login_user_to_db,
  chagne_password_into_db,
};
