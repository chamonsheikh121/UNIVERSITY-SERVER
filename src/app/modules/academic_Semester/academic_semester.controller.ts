import { send_response } from '../../Middle_wares/send_response';
import { catchAsync } from '../../utils/catch_async';
import { academic_semester_service } from './academic_semester.service';

const create_academic_semester = catchAsync(async (req, res, next) => {
  const result = await academic_semester_service.create_academic_semester_to_db(
    req.body,
  );
  send_response(res, {
    message: 'academic semester created successfully',
    data: result,
  });
});

export const academic_semester_controller = {
  create_academic_semester,
};
