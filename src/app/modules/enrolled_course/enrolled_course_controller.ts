import { send_response } from '../../Middle_wares/send_response';
import { catchAsync } from '../../utils/catch_async';
import { enrolled_course_services } from './enrolled_course.service';

const create_enrolled_course = catchAsync(async (req, res, next) => {
  const result = await enrolled_course_services.create_enrolled_course_to_db();

  send_response(res, {
    message: 'enrolled successfully',
    data: result,
  });
});

export const enrolled_course_controller = {
  create_enrolled_course,
};
