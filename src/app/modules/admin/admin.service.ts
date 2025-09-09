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
  const result = await AdminModel.findById(id);
  return result;
};

const delete_admin_from_db = async (id: string) => {
  // is exist or not need to sure first

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const admin_deletion = await AdminModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!admin_deletion) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'failed to delete admin');
    }

    const userId = admin_deletion.userId;

    const user_deletion = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!user_deletion) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return admin_deletion;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const update_admin_from_db = async (
  id: string,
  payload: Record<string, unknown>,
) => {
  const { name, ...remaining_admin_primitive_data } = payload;

  const updated_admin_data: Record<string, unknown> = {
    ...remaining_admin_primitive_data,
  };

  if (name && Object.keys(name).length) {
    for (const [keys, value] of Object.entries(name)) {
      updated_admin_data[`name.${keys}`] = value;
    }
  }

  const result = await AdminModel.findByIdAndUpdate(id, updated_admin_data, {
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
