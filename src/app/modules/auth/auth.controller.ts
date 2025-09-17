import { JwtPayload } from 'jsonwebtoken';
import { send_response } from '../../Middle_wares/send_response';
import { catchAsync } from '../../utils/catch_async';
import { auth_services } from './auth.service';
import config from '../../config';

const login_user = catchAsync(async (req, res, next) => {
  const { auth_data } = req.body;
  const result = await auth_services.login_user_to_db(auth_data);
  const { accessToken, refreshToken, need_password_change } = result;

  res.cookie('refresh_token', refreshToken, {
    secure: config.NODE_ENV == 'production',
    httpOnly: true,
  });
  res.cookie('access_token', accessToken, {
    secure: config.NODE_ENV == 'production',
    httpOnly: true,
  });

  send_response(res, {
    message: 'user logged in successfully',
    data: {
      accessToken,
      need_password_change,
    },
  });
});

const change_password = catchAsync(async (req, res, next) => {
  const { password_data } = req.body;
  const decoded_user = req.user as JwtPayload;

  const result = await auth_services.change_password_into_db(
    decoded_user,
    password_data,
  );
  send_response(res, {
    message: 'password changed successfully',
    data: result,
  });
});
export const auth_controller = {
  login_user,
};

const refresh_token = catchAsync(async (req, res, next) => {
  const { refresh_token } = req.cookies;

  const result =
    await auth_services.create_access_token_by_refresh_token(refresh_token);
  send_response(res, {
    message: 'new accesst token retireved successfully',
    data: result,
  });
});

const forget_password = catchAsync(async (req, res, next) => {
  const { forget_pass_data } = req.body;
  const result = await auth_services.create_reset_link(forget_pass_data?.id);
  send_response(res, {
    message: 'link genarated successfully',
    data: result,
  });
});

const reset_password = catchAsync(async (req, res, next) => {
  const { reset_pass_data } = req.body;
  const token = req.headers.authorization;
  const result = await auth_services.reset_password_and_update_to_db(
    token,
    reset_pass_data,
  );
  send_response(res, {
    message: 'password updated successfully',
    data: result,
  });
});

export const auth_controllers = {
  login_user,
  change_password,
  refresh_token,
  forget_password,
  reset_password,
};
