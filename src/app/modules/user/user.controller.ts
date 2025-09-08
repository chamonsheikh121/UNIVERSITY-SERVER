import { user_services } from './user.service';
import { send_response } from '../../Middle_wares/send_response';
import { catchAsync } from '../../utils/catch_async';
import AppError from '../../errors/AppError';
import HttpStatus from 'http-status';

const createStudent = catchAsync(async (req, res, next) => {
  const { password, studentData } = req.body;
  const result = await user_services.create_student_to_db(
    password,
    studentData,
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

console.log('Exporting createStudent =>', createStudent);

export const user_controllers = {
  createStudent,
  create_faculty,
};
