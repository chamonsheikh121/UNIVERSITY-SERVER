import mongoose from 'mongoose';
import config from '../../config';
import { Academic_Semester_Model } from '../academic_Semester/academic_semester.model';
import { TStudent } from '../student/student.interface';
import StudentModel from '../student/student.model';
import { genarate_student_id } from './user.genarate_user_id';
import { TNewUser, TUser } from './user.interface';
import UserModel from './user.model';
import AppError from '../../errors/AppError';
import HttpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { genarate_faculty_id } from './user.genarate_faculty_id';
import { FacultyModel } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { genarate_admin_id } from './user.genarate_admin_id';
import { AdminModel } from '../admin/admin.model';
import { send_img_file_to_cloudinary } from '../../utils/send_file_to_cludinary';

const create_student_to_db = async (
  password: string,
  payload: TStudent,
  path: string | undefined,
) => {
  if (await StudentModel.is_student_email_exist(payload?.email)) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'student already exist');
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
    userData.email = payload?.email;
    userData.role = 'student';
    userData.status = 'in-progress';

    const cloudinary_uploading = await send_img_file_to_cloudinary(
      path as string,
      `as_${userData.role}_and_id_${userData.id}`,
    );

    console.log(cloudinary_uploading);
    const profileImage = cloudinary_uploading.secure_url;

    const result_user = await UserModel.create([userData], { session });

    if (!result_user.length) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'falied to create user');
    }

    payload.id = result_user[0].id;
    payload.userId = result_user[0]._id;
    payload.profileImage = profileImage;
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

const create_faculty_to_db = async (
  password: string,
  payload: TFaculty,
  path: string | undefined,
) => {
  // need to check here if email exist or not

  const newUser: Partial<TNewUser> = {};
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    newUser.password = password || (config.default_password as string);
    newUser.email = payload?.email;
    newUser.role = 'faculty';
    newUser.status = 'in-progress';
    newUser.id = await genarate_faculty_id();

    const upload_image_to_cloudinary = await send_img_file_to_cloudinary(
      path,
      `as_${newUser.role}_and_id_${newUser.id}`,
    );
    const profile_image = upload_image_to_cloudinary.secure_url;

    const user_result = await UserModel.create([newUser], { session });

    if (!user_result.length) {
      throw new AppError(HttpStatus.BAD_REQUEST, ' user creation failed');
    }

    payload.id = user_result[0].id;
    payload.userId = user_result[0]._id;
    payload.profile_image = profile_image;
    const faculty_result = await FacultyModel.create([payload], { session });

    if (!faculty_result.length) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return faculty_result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const create_admin_to_db = async (
  password: string,
  payload: TAdmin,
  path: string | undefined,
) => {
  // need to check here if email exist or not

  const newUser: Partial<TNewUser> = {};

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    newUser.email = payload?.email;
    newUser.role = 'admin';
    newUser.status = 'in-progress';
    newUser.password = password || config.default_password;
    newUser.id = await genarate_admin_id();

    const upload_image_to_cloudinary = await send_img_file_to_cloudinary(
      path as string,
      `as_${newUser.role}_and_id_${newUser.id}`,
    );
    const profile_image = upload_image_to_cloudinary.secure_url;

    const user_creation = await UserModel.create([newUser], { session });

    console.log(user_creation);
    if (!user_creation.length) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'failed to create user');
    }

    payload.id = user_creation[0].id;
    payload.userId = user_creation[0]._id;
    payload.profile_image = profile_image;
    const admin_creation = await AdminModel.create([payload], { session });

    console.log(admin_creation);

    if (!admin_creation.length) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return admin_creation;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const get_me_from_db = async (id: string, role: string) => {
  let result = null;
  if (role == 'student') {
    result = await StudentModel.findOne({
      id,
    });
  }
  if (role == 'faculty') {
    result = await FacultyModel.findOne({
      id,
    });
  }
  if (role == 'admin') {
    result = await AdminModel.findOne({
      id,
    });
  }

  return result;
};

const change_user_status_to_db = async (
  _id: string,
  role: string,
  payload: Pick<TUser, 'status'>,
) => {
  console.log(_id, role,payload);

  const result = await UserModel.findByIdAndUpdate(
    {
      _id,
    },
    {
      status: payload.status,
    },
    {
      new: true,
    },
  );

  return result;
};

export const user_services = {
  create_student_to_db,
  create_faculty_to_db,
  create_admin_to_db,
  get_me_from_db,
  change_user_status_to_db,
};
