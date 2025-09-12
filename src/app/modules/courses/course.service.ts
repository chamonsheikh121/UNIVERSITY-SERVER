import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import HttpStatus from 'http-status';
import { Course_Faculties_Model, CourseModel } from './course.model';
import { TCourse, TCourse_faculties } from './course.interface';
import Query_Builder from '../../builder/query_bulder';
import { course_searchable_fields } from './course.constance';

const create_course_from_db = async (payload: TCourse) => {
  const result = (await CourseModel.create(payload)).populate(
    'pre_requisite_courses.course_id',
  );
  return result;
};

const get_courses_from_db = async (query: Record<string, unknown>) => {
  const courseQuery = new Query_Builder(
    CourseModel.find().populate('pre_requisite_courses.course_id'),
    query,
  )
    .search(course_searchable_fields)
    .filter()
    .sort()
    .pagination()
    .field_limit();

  const result = await courseQuery.model_query;
  return result;
};
const get_single_course_from_db = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    'pre_requisite_courses.course_id',
  );
  return result;
};

const delete_course_from_db = async (id: string) => {
  // is exist or not need to sure first

  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const update_course_from_db = async (
  id: string,
  payload: Record<string, unknown>,
) => {
  const { pre_requisite_courses, ...courseRestData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const update_basic_course_info = await CourseModel.findByIdAndUpdate(
      id,
      courseRestData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!update_basic_course_info) {
      throw new AppError(HttpStatus.BAD_REQUEST, ' failed to update');
    }
    // if pre_requisite_courses got any changes

    const preReqs = pre_requisite_courses as Array<{
      course_id: string;
      isDeleted?: boolean;
    }>;
    if (preReqs && preReqs.length > 0) {
      const deleting_prerequsit_course_id = preReqs
        ?.filter((el) => el.course_id && el.isDeleted)
        .map((el) => el.course_id);

      const delete_pre_requisite_cources = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            pre_requisite_courses: {
              course_id: { $in: deleting_prerequsit_course_id },
            },
          },
        },
        {
          new: true,
          session,
        },
      );

      if (!delete_pre_requisite_cources) {
        throw new AppError(HttpStatus.BAD_REQUEST, ' failed to remove');
      }

      const course = await CourseModel.findById(id).lean();
      const existingIds = course?.pre_requisite_courses?.map((c) =>
        String(c.course_id),
      );
      console.log(existingIds);

      const adding_prerequsit_course_id = preReqs.filter(
        (el) =>
          el.course_id && !el.isDeleted && !existingIds?.includes(el.course_id),
      );

      console.log(adding_prerequsit_course_id);
      const add_prerequsit_course = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            pre_requisite_courses: { $each: adding_prerequsit_course_id },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!add_prerequsit_course) {
        throw new AppError(HttpStatus.BAD_REQUEST, ' failed to add');
      }

      if (delete_pre_requisite_cources && add_prerequsit_course) {
        return add_prerequsit_course;
      } else {
        return delete_pre_requisite_cources;
      }
    }

    await session.commitTransaction();
    await session.endSession();

    return update_basic_course_info;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(HttpStatus.BAD_REQUEST, 'failed to update course data');
  }
};

const assign_faculties_and_course_to_db = async (
  id: string,
  payload: Partial<TCourse_faculties>,
) => {
  console.log(id);
  const result = await Course_Faculties_Model.findByIdAndUpdate(
    id,
    { course_id: id, $addToSet: { faculties: { $each: payload } } },
    { upsert: true, new: true },
  );
  return result;
};
const remove_faculties_and_course_to_db = async (
  id: string,
  payload: Partial<TCourse_faculties>,
) => {
  const result = await Course_Faculties_Model.findByIdAndUpdate(
    id,
    { $pull: { faculties: { $in: payload } } },
    { upsert: true, new: true },
  );
  return result;
};

export const course_services = {
  create_course_from_db,
  get_courses_from_db,
  get_single_course_from_db,
  delete_course_from_db,
  update_course_from_db,
  assign_faculties_and_course_to_db,
  remove_faculties_and_course_to_db,
};
