import { send_response } from '../../Middle_wares/send_response';
import { catchAsync } from '../../utils/catch_async';
import { auth_services } from './auth.service';

const login_user = catchAsync(async (req, res, next) => {
  const { auth_data } = req.body;
  const result = await auth_services.login_user_to_db(auth_data);
  send_response(res, {
    message: 'user logged in successfully',
    data: result,
  });
});
export const auth_controller = {
  login_user,
};

export const auth_controllers = {
  login_user,
};
