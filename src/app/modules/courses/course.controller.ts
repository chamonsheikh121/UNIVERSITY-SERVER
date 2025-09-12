import { send_response } from '../../Middle_wares/send_response';
import { catchAsync } from '../../utils/catch_async';
import { course_services } from './course.service';

const create_course = catchAsync(async (req, res, next) => {
  const { course_data } = req.body;

  const result = await course_services.create_course_from_db(course_data);

  send_response(res, {
    message: 'courses retrived successfully',
    data: result,
  });
});

const get_courses = catchAsync(async (req, res, next) => {
  const result = await course_services.get_courses_from_db();

  send_response(res, {
    message: 'courses retrived successfully',
    data: result,
  });
});
const get_single_course = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const result = await course_services.get_single_course_from_db(_id);

  send_response(res, {
    message: 'course retrived successfully',
    data: result,
  });
});
const delete_course = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const result = await course_services.delete_course_from_db(_id);
  send_response(res, {
    message: 'course deleted successfully',
    data: result,
  });
});

const update_course = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const { course_data } = req.body;

  const result = await course_services.update_course_from_db(_id, course_data);

  send_response(res, {
    message: 'course updated successfully',
    data: result,
  });
});

const assign_course_faculties = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const { faculties } = req.body.course_faculties_data;

  const result = await course_services.assign_faculties_and_course_to_db(
    _id,
    faculties,
  );
  send_response(res, {
    message: 'faculty assigned successfully',
    data: result,
  });
});

const remove_course_faculties = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const { faculties } = req.body.course_faculties_data;

  const result = await course_services.remove_faculties_and_course_to_db(
    _id,
    faculties,
  );
  send_response(res, {
    message: 'faculty assigned successfully',
    data: result,
  });
});

export const course_contollers = {
  create_course,
  get_courses,
  get_single_course,
  delete_course,
  update_course,
  assign_course_faculties,
  remove_course_faculties,
};
