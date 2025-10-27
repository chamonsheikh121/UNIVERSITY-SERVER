import mongoose from 'mongoose';
import StudentModel from './student.model';
import AppError from '../../errors/AppError';
import HttpStatus from 'http-status';
import UserModel from '../user/user.model';
import { TStudent } from './student.interface';
import Query_Builder from '../../builder/query_bulder';
import { student_searchable_fields } from './student.constance';
import { create_meta_data } from '../../utils/meta_data_maker';

export const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // ✅ build query with chaining
  const student_query = new Query_Builder(
    StudentModel.find()
      .populate('userId')
      .populate('academic_semester_id')
      .populate({
        path: 'academic_department_id',
        populate: {
          path: 'academic_faculty_id',
        },
      }),
    query,
  )
    .search(student_searchable_fields)
    .filter()
    .sort()
    .pagination()
    .field_limit();

  // get the paginated result
  const result = await student_query.model_query;

  // ✅ count total number of documents that match filters
  const total = await StudentModel.countDocuments(
    student_query.filter_condition, // important: pass same filter
  );

  // ✅ generate meta data for frontend pagination
  const meta = create_meta_data(query, total);

  return { result, meta };
};
const get_single_student_from_db = async (id: string) => {
  const result = await StudentModel.findById(id);

  return result;
};

const deleteStudentFromDB = async (id: string) => {
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

    const delete_student = await StudentModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    console.log('delete_student,', delete_student);

    if (!delete_student) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'failed to delete student');
    }

    const user_id = delete_student.userId;
    const delete_user = await UserModel.findByIdAndUpdate(
      user_id,
      { isDeleted: true },
      { new: true, session },
    );

    console.log('delete_user', delete_user);

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
  console.log(payload);

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

  console.log(updated_student_data);

  const result = await StudentModel.findByIdAndUpdate(
    id,
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
