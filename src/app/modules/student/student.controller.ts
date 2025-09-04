import { studentServices } from './student.service';
import { send_response } from '../../Middle_wares/send_response';
import { catchAsync } from '../../utils/catch_async';

const getStudents = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudentsFromDB();
  send_response(res, {
    message: 'students retrieved successfully',
    data: result,
  });
  res.status(200).json({
    success: true,
  });
});

const getStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const result = await studentServices.getStudentFromDB(id);
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

export const studentsControllers = {
  getStudents,
  getStudent,
  deleteStudent,
};
