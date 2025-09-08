import mongoose from 'mongoose';
import UserModel from '../user/user.model';
import AppError from '../../errors/AppError';
import HttpStatus from 'http-status';
import { AdminModel } from './admin.model';
import { TAdmin } from './admin.interface';

const get_admins_from_db = async () => {
  const result = await AdminModel.find();
  return result;
};
const get_single_admin_from_db = async (id: string) => {
  const result = await AdminModel.find({ id });
  return result;
};

const delete_admin_from_db = async (id: string) => {
  // is exist or not need to sure first

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user_deletaion = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!user_deletaion) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'failded to delete user');
    }

    const admin_deletation = await AdminModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!admin_deletation) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'failed to delete Faculty');
    }

    await session.commitTransaction();
    await session.endSession();
    return admin_deletation;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const update_admin_from_db = async (
  id: string,
  payload: Record<string, unknown>,
) => {
  console.log('I am from admin server: ', id, payload);

  const { name, ...remaining_admin_primitive_data } = payload;

  const updated_admin_data: Record<string, unknown> = {
    ...remaining_admin_primitive_data,
  };

  if (name && Object.keys(name).length) {
    for (const [keys, value] of Object.entries(name)) {
      updated_admin_data[`name.${keys}`] = value;
    }
  }

  const result = await AdminModel.findOneAndUpdate({ id }, updated_admin_data, {
    new: true,
    runValidators: true,
  });
  return result;
};

const admin_services = {
  get_admins_from_db,
  get_single_admin_from_db,
  update_admin_from_db,
  delete_admin_from_db,
};
export default admin_services;
