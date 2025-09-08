import { studentServices } from './student.service';
import { send_response } from '../../Middle_wares/send_response';
import { catchAsync } from '../../utils/catch_async';
import AppError from '../../errors/AppError';
import HttpStatus from 'http-status';

const getStudents = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudentsFromDB(req.query);
  if (!result) {
    throw new AppError(
      HttpStatus.NOT_FOUND,
      'no data found { check isDeleted or not :) }',
    );
  }

  send_response(res, {
    message: 'students retrieved successfully',
    data: result,
  });
});

const get_single_student = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const result = await studentServices.get_single_student_from_db(id);
  send_response(res, {
    message: 'student retrieved successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteStudentFromDB(studentId);
  send_response(res, {
    message: 'student deleted successfully',
    data: result,
  });
});

const update_student = catchAsync(async (req, res, next) => {
  const { student_id } = req.params;
  const { student_data } = req.body;

  const result = await studentServices.update_student_from_db(
    student_id,
    student_data,
  );

  send_response(res, {
    message: 'student updated successfully',
    data: result,
  });
});
export const studentsControllers = {
  getStudents,
  get_single_student,
  deleteStudent,
  update_student,
};
