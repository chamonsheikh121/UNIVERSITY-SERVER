import { user_services } from './user.service';
import { send_response } from '../../Middle_wares/send_response';
import { catchAsync } from '../../utils/catch_async';
import AppError from '../../errors/AppError';
import HttpStatus from 'http-status';

const create_student = catchAsync(async (req, res, next) => {
  const path = req?.file?.path;

  const { password, student_data } = req.body;
  const result = await user_services.create_student_to_db(
    password,
    student_data,
    path,
  );

  if (!result) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'student creation failed');
  }

  send_response(res, {
    message: 'student created successfully',
    data: result,
  });
});
const create_faculty = catchAsync(async (req, res, next) => {
  const { password, faculty_data } = req.body;
  const path = req?.file?.path;
  const result = await user_services.create_faculty_to_db(
    password,
    faculty_data,
    path,
  );

  // if (!result) {
  //   throw new AppError(HttpStatus.BAD_REQUEST, 'faculty creation failed');
  // }

  send_response(res, {
    message: 'faculty created successfully',
    data: result,
  });
});
const create_admin = catchAsync(async (req, res, next) => {
  const { password, admin_data } = req.body;
  const path = req?.file?.path;
  const result = await user_services.create_admin_to_db(
    password,
    admin_data,
    path,
  );

  // if !result then better throw a error

  send_response(res, {
    message: 'admin created successfully',
    data: result,
  });
});

const get_me = catchAsync(async (req, res, next) => {
  const { id, role } = req.user;

  const result = await user_services.get_me_from_db(id, role);
  send_response(res, {
    message: 'Retrieved my data successfully',
    data: result,
  });
});

const change_user_status = catchAsync(async (req, res, next) => {
  const { role } = req.user;
  const { user_id } = req.params;

  const result = await user_services.change_user_status_to_db(
    user_id,
    role,
    req.body,
  );

  send_response(res, {
    message: `user status changed successfully`,
    data: result,
    meta: '',
  });
});

export const user_controllers = {
  create_student,
  create_faculty,
  create_admin,
  get_me,
  change_user_status,
};
