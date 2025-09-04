import mongoose from 'mongoose';
import config from '../../config';
import { Academic_Semester_Model } from '../academic_Semester/academic_semester.model';
import { TStudent } from '../student/student.interface';
import StudentModel from '../student/student.model';
import { genarate_student_id } from './user.genarate_user_id';
import { TNewUser } from './user.interface';
import UserModel from './user.model';
import AppError from '../../errors/AppError';
import HttpStatus from 'http-status';
const create_student_to_db = async (password: string, payload: TStudent) => {
  if (await StudentModel.is_student_email_exist(payload.email)) {
    throw new Error('User already exist from statics ! ');
  }

  const userData: Partial<TNewUser> = {};

  const academic_semester = await Academic_Semester_Model.findById(
    payload.academic_semester_id,
  );
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await genarate_student_id(academic_semester);
    userData.password = password || (config.default_password as string);
    userData.role = 'student';
    userData.status = 'in-progress';

    const result_user = await UserModel.create([userData], { session });

    if (!result_user.length) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'falied to create user');
    }

    console.log(result_user);

    payload.id = result_user[0].id;
    payload.userId = result_user[0]._id;
    const result_student = await StudentModel.create([payload], { session });

    if (!result_student.length) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return result_student[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const user_services = {
  create_student_to_db,
};
