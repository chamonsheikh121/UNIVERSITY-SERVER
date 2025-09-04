import mongoose from 'mongoose';
import StudentModel from './student.model';
import AppError from '../../errors/AppError';
import HttpStatus from 'http-status';
import UserModel from '../user/user.model';

const getAllStudentsFromDB = async () => {
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
const getStudentFromDB = async (id: string) => {
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

export const studentServices = {
  getAllStudentsFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
};
