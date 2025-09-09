import mongoose from 'mongoose';
import { FacultyModel } from './faculty.model';
import UserModel from '../user/user.model';
import AppError from '../../errors/AppError';
import HttpStatus from 'http-status';

const get_faculties_from_db = async () => {
  const result = await FacultyModel.find();
  return result;
};
const get_single_faculty_from_db = async (id: string) => {
  const result = await FacultyModel.findById(id);
  return result;
};

const delete_faculty_from_db = async (id: string) => {
  // is exist or not need to sure first

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const faculty_deletion = await FacultyModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!faculty_deletion) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'failed to delete Faculty');
    }

    const facultyId = faculty_deletion.userId;

    const user_deletion = await UserModel.findByIdAndUpdate(
      facultyId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!user_deletion) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'failded to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return faculty_deletion;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const update_faculty_from_db = async (
  id: string,
  payload: Record<string, unknown>,
) => {
  console.log('updating values are : ', payload);
  const result = await FacultyModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const faculty_services = {
  get_faculties_from_db,
  get_single_faculty_from_db,
  delete_faculty_from_db,
  update_faculty_from_db,
};
