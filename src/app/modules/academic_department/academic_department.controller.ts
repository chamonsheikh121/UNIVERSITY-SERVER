/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { send_response } from "../../Middle_wares/send_response";
import { catchAsync } from "../../utils/catch_async";
import { academic_department_services } from "./academic_department.service";



const create_academic_department = catchAsync(async (req, res, next) => {
  const result = await academic_department_services.create_academic_department_to_db(
    req.body,
  );
  send_response(res, {
    message: 'academic department created successfully',
    data: result,
  });
});

const get_all_academic_department = catchAsync(async (req, res, next) => {
  const result =
    await academic_department_services.get_all_academic_departments_from_db();
  send_response(res, {
    message: 'academic departments retrived successfully',
    data: result,
  });
});
const get_single_academic_department = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result =
    await academic_department_services.get_single_academic_department_from_db(id);
  send_response(res, {
    message: 'academic department retrived successfully',
    data: result,
  });
});
const update_academic_department = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await academic_department_services.update_academic_department_from_db(id, req.body);
  send_response(res, {
    message: 'academic department updated successfully',
    data: result,
  });
});

export const academic_department_controller = {
  create_academic_department,
  get_all_academic_department,
  get_single_academic_department,
  update_academic_department,
};
