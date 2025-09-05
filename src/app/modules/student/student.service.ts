import mongoose from 'mongoose';
import StudentModel from './student.model';
import AppError from '../../errors/AppError';
import HttpStatus from 'http-status';
import UserModel from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async () => {
  const count = await StudentModel.countDocuments();
  console.log('Total students in collection:', count);
  const result = await StudentModel.find()
    .populate('academic_semester_id')
    .populate({
      path: 'academic_department_id',
      populate: {
        path: 'academic_faculty_id',
      },
    });

  return result;
};
const get_single_student_from_db = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  console.log(id);

  const student = await StudentModel.is_student_id_exist(id);

  if (!student) {
    throw new AppError(
      HttpStatus.NOT_FOUND,
      "student doesn't exist from statics",
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const delete_student = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!delete_student) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'failed to delete student');
    }

    const delete_user = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!delete_user) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return delete_student;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const update_student_from_db = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  console.log('payload and id', id);

  const { name, guardian, localGuardian, ...remaining_student_primitive_data } =
    payload;

  const updated_student_data: Record<string, unknown> = {
    ...remaining_student_primitive_data,
  };

  if (name && Object.keys(name).length) {
    for (const [keys, value] of Object.entries(name)) {
      updated_student_data[`name.${keys}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [keys, value] of Object.entries(guardian)) {
      updated_student_data[`guardian.${keys}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [keys, value] of Object.entries(localGuardian)) {
      updated_student_data[`localGuardian.${keys}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id },
    updated_student_data,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const studentServices = {
  getAllStudentsFromDB,
  get_single_student_from_db,
  deleteStudentFromDB,
  update_student_from_db,
};
