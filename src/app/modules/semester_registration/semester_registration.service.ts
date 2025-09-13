import AppError from '../../errors/AppError';
import { TSemesterRegistration } from './semester_registration.interface';
import { SemesterRegistrationModel } from './semester_registration.model';
import httpstatus from 'http-status';

const create_semester_registration_to_db = async (
  payload: TSemesterRegistration,
) => {
  const is_any_upcomming_or_ongoing_there =
    await SemesterRegistrationModel.findOne({
      $or: [{ status: 'ONGOING' }, { status: 'UPCOMING' }],
    });

  if (is_any_upcomming_or_ongoing_there) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      `There is already an ${is_any_upcomming_or_ongoing_there.status} registered semester`,
    );
  }

  if (
    await SemesterRegistrationModel.is_semester_registration_exist(
      payload?.academic_semester_id,
    )
  ) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      'semester registration already exist',
    );
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};
const get_all_semester_registrations_from_db = async () => {
  const result = await SemesterRegistrationModel.find();
  return result;
};
const get_single_semester_registration_from_db = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);
  return result;
};

const update_registered_semester_to_db = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const is_exist =
    await SemesterRegistrationModel.is_semester_registration_id_exist(id);

  if (!is_exist) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      'No registration semester found',
    );
  }

  if (is_exist?.status == 'ENDED') {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      'You can not udpate and ended registered semester details',
    );
  } else if (
    (is_exist?.status == 'ONGOING' && payload?.status == 'UPCOMMING') ||
    (is_exist?.status == 'UPCOMMING' && payload.status == 'ENDED')
  ) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      `You can not change status from ${is_exist?.status} to ${payload?.status}`,
    );
  }
  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true },
  );
  return result;
};

export const semester_registration_services = {
  create_semester_registration_to_db,
  get_all_semester_registrations_from_db,
  get_single_semester_registration_from_db,
  update_registered_semester_to_db,
};
