/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { send_response } from '../../Middle_wares/send_response';
import { catchAsync } from '../../utils/catch_async';
import { SemesterRegistrationModel } from './semester_registration.model';
import { semester_registration_services } from './semester_registration.service';

const create_semester_registration = catchAsync(async (req, res, next) => {
  const { semester_resgistration_data } = req.body;

  console.log(semester_resgistration_data);

  const result =
    await semester_registration_services.create_semester_registration_to_db(
      semester_resgistration_data,
    );
  send_response(res, {
    message: 'Semester registration successfull',
    data: result,
  });
});

const get_all_registered_semesters = catchAsync(async (req, res, next) => {
  const result =
    await semester_registration_services.get_all_semester_registrations_from_db();
  send_response(res, {
    message: 'registered semester retrived successfully',
    data: result,
  });
});
const get_single_registered_semester = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const result =
    await semester_registration_services.get_single_semester_registration_from_db(
      _id,
    );
  send_response(res, {
    message: 'academic semester retrived successfully',
    data: result,
  });
});
const update_registered_semester = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const { semester_resgistration_data } = req.body;
  const result =
    await semester_registration_services.update_registered_semester_to_db(
      _id,
      semester_resgistration_data,
    );

  send_response(res, {
    message: 'Semester registration updated successfully',
    data: result,
  });
});

export const semester_regiestration_controller = {
  create_semester_registration,
  get_all_registered_semesters,
  get_single_registered_semester,
  update_registered_semester,
};
