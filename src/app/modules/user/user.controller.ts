import { user_services } from './user.service';
import { send_response } from '../../Middle_wares/send_response';
import { catchAsync } from '../../utils/catch_async';

const createStudent = catchAsync(async (req, res, next) => {
  console.log('request body');

  const { password, studentData } = req.body;
  const result = await user_services.create_student_to_db(
    password,
    studentData,
  );
  send_response(res, {
    message: 'student created successfully',
    data: result,
  });
});

console.log('Exporting createStudent =>', createStudent);

export const user_controllers = {
  createStudent,
};
