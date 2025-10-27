import config from '../../config';
import AppError from '../../errors/AppError';
import UserModel from '../user/user.model';
import { TAuth_user, TChange_password } from './auth.interface';
import HttpStatus from 'http-status';
import jwt, { JwtPayload, SignOptions, TokenExpiredError } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { create_token } from './auth.utiles';
import { mail_sender } from '../../utils/sendMail';
import { NextFunction } from 'express';

const login_user_to_db = async (payload: TAuth_user) => {
  const user = await UserModel.is_user_exist_by_custom_id(payload?.id);

  if (!user) {
    throw new AppError(HttpStatus.FORBIDDEN, 'user not found');
  }
  if (user.status == 'blocked') {
    throw new AppError(HttpStatus.FORBIDDEN, 'This user already blocked');
  }
  if (user.isDeleted) {
    throw new AppError(HttpStatus.FORBIDDEN, 'This user already deleted');
  }
  if (!(await UserModel.validate_password(payload?.password, user?.password))) {
    throw new AppError(HttpStatus.FORBIDDEN, "password doesn't match");
  }

  const jwt_payload = {
    id: user.id as string,
    role: user.role as string,
  };

  const accessToken = create_token(
    jwt_payload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_SECRET_TIME as SignOptions['expiresIn'],
  );
  const refreshToken = create_token(
    jwt_payload,
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_SECRET_TIME as SignOptions['expiresIn'],
  );

  return {
    accessToken,
    refreshToken,
    need_password_change: user?.need_password_change,
  };
};

const change_password_into_db = async (
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

const create_access_token_by_refresh_token = async (refresh_token: string) => {
  if (!refresh_token) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'you are not authorized !!! ');
  }

  let decoded;
  try {
    decoded = jwt.verify(
      refresh_token,
      config.JWT_REFRESH_SECRET as string,
    ) as JwtPayload;
  } catch (error) {
    if ((error as TokenExpiredError)?.name == 'TokenExpiredError') {
      throw new AppError(
        HttpStatus.UNAUTHORIZED,
        'refresh token expired  !!! ',
      );
      //  ata just next() a pathai disse but function running thake tai return kore stop kore dite
    }
    throw new AppError(HttpStatus.UNAUTHORIZED, 'You are not authorized !!! ');
  }

  if (!decoded) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'you are not authorized  !!! ');
  }

  const { id, iat } = decoded;

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

  if (
    user?.last_pass_changed_at &&
    UserModel.last_login_and_pass_update_comparision(
      user.last_pass_changed_at,
      iat as number,
    )
  ) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'you are not authorized  !!! ');
  }

  const jwt_payload = {
    id: user.id as string,
    role: user.role as string,
  };
  const accessToken = create_token(
    jwt_payload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_SECRET_TIME as SignOptions['expiresIn'],
  );

  return {
    accessToken,
  };
};

const create_reset_link = async (id: string) => {
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

  const jwt_payload = {
    id: user.id as string,
    role: user.role as string,
  };
  const reset_pass_token = create_token(
    jwt_payload,
    config.JWT_ACCESS_SECRET as string,
    '10m',
  );

  const reset_ui_link = `${config.RESET_PASSWORD_UI_DOMAIN}?id=${id}&&token=${reset_pass_token}`;

  const resetPasswordHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); padding: 24px; color: #333;">
  <h2 style="color: #4f46e5; text-align: center; margin-bottom: 20px;">Password Reset Request</h2>
  
  <p style="font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
    We received a request to reset the password for your account. Click the button below to reset your password.
  </p>
  
  <div style="text-align: center; margin: 28px 0;">
    <a href="${reset_ui_link}" target="_blank" 
       style="background: linear-gradient(90deg,#4f46e5,#06b6d4); color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; display: inline-block;">
       Reset Password
    </a>
  </div>
  
  <p style="font-size: 14px; color: #555; margin-bottom: 12px;">
    ⚠️ This link will be valid for <strong>10 minutes</strong>.  
    If you didn’t request a password reset, you can safely ignore this email.
  </p>
  
  <p style="font-size: 13px; color: #777; margin-top: 20px;">
    Or copy and paste this link into your browser:  
    <br>
    <a href="${reset_ui_link}" target="_blank" style="color:#4f46e5; word-break: break-all;">${reset_ui_link}</a>
  </p>
  
  <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
  
  <p style="font-size: 12px; color: #aaa; text-align: center;">
    &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
  </p>
</div>
`;

  mail_sender(user?.email as string, resetPasswordHtml);

  return reset_ui_link;
};

const reset_password_and_update_to_db = async (
  token: string,
  payload: { id: string; new_password: string },
) => {
  const decoded = jwt.verify(
    token,
    config.JWT_ACCESS_SECRET as string,
  ) as JwtPayload;
  const { id, role } = decoded;

  if (id != payload?.id) {
    throw new AppError(
      HttpStatus.NOT_FOUND,
      'sended user id and token user id is doesnt match',
    );
  }
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

  const hash_new_password = await bcrypt.hash(
    payload?.new_password,
    Number(config.salt_rounds),
  );

  const result = await UserModel.findOneAndUpdate(
    {
      id,
      role: role,
    },
    {
      password: hash_new_password,
      need_password_change: false,
      last_pass_changed_at: new Date(),
    },
    {
      new: true,
    },
  );
  return result;
};

export const auth_services = {
  login_user_to_db,
  change_password_into_db,
  create_access_token_by_refresh_token,
  create_reset_link,
  reset_password_and_update_to_db,
};
