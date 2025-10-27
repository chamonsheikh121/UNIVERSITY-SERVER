/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { send_response } from '../../Middle_wares/send_response';
import { catchAsync } from '../../utils/catch_async';
import { academic_faculty_services } from './academic_faculty.service';

const create_academic_faculty = catchAsync(async (req, res, next) => {
  const result = await academic_faculty_services.create_academic_faculty_to_db(
    req.body,
  );
  send_response(res, {
    message: 'academic faculty created successfully',
    data: result,
  });
});

const get_all_academic_faculties = catchAsync(async (req, res, next) => {
  const result =
    await academic_faculty_services.get_all_academic_faculties_from_db(
      req.query,
    );
  send_response(res, {
    message: 'academic faculties retrieved successfully',
    data: result,
  });
});
const get_single_academic_faculty = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result =
    await academic_faculty_services.get_single_academic_faculty_from_db(id);
  send_response(res, {
    message: 'academic faculty retrieved successfully',
    data: result,
  });
});
const update_academic_faculty = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result =
    await academic_faculty_services.update_academic_faculty_from_db(
      id,
      req.body,
    );
  send_response(res, {
    message: 'academic faculty updated successfully',
    data: result,
  });
});

export const academic_faculty_controller = {
  create_academic_faculty,
  get_all_academic_faculties,
  get_single_academic_faculty,
  update_academic_faculty,
};
