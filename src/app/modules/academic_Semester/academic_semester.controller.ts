/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
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

const get_all_academic_semesters = catchAsync(async (req, res, next) => {
  const result =
    await academic_semester_service.get_all_academic_semesters_from_db();
  send_response(res, {
    message: 'academic semesters retrived successfully',
    data: result,
  });
});
const get_single_academic_semester = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result =
    await academic_semester_service.get_single_academic_semester_from_db(id);
  send_response(res, {
    message: 'academic semester retrived successfully',
    data: result,
  });
});
const update_academic_semester = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result =
    await academic_semester_service.update_academic_semester_from_db(id);
  send_response(res, {
    message: 'academic semester updated successfully',
    data: result,
  });
});

export const academic_semester_controller = {
  create_academic_semester,
  get_all_academic_semesters,
  get_single_academic_semester,
  update_academic_semester,
};
