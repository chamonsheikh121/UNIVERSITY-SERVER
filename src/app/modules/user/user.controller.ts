import { user_services } from './user.service';
import { send_response } from '../../Middle_wares/send_response';
import { catchAsync } from '../../utils/catch_async';
import AppError from '../../errors/AppError';
import HttpStatus from 'http-status';

const create_student = catchAsync(async (req, res, next) => {
  const { password, student_data } = req.body;
  const result = await user_services.create_student_to_db(
    password,
    student_data,
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

  const result = await user_services.create_faculty_to_db(
    password,
    faculty_data,
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

  const result = await user_services.create_admin_to_db(password, admin_data);

  // if !result then better throw a error

  send_response(res, {
    message: 'admin created successfully',
    data: result,
  });
});
export const user_controllers = {
  create_student,
  create_faculty,
  create_admin,
};
