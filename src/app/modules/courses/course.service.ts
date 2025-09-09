import mongoose from 'mongoose';
import UserModel from '../user/user.model';
import AppError from '../../errors/AppError';
import HttpStatus from 'http-status';
import { CourseModel } from './course.model';
import { TCourse } from './course.interface';
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

  const update_basic_course_info = await CourseModel.findByIdAndUpdate(
    id,
    courseRestData,
    {
      new: true,
      runValidators: true,
    },
  );

  // if pre_requisite_courses got any changes

  console.log(pre_requisite_courses);

  const preReqs = pre_requisite_courses as Array<{
    course_id: string;
    isDeleted?: boolean;
  }>;

  if (preReqs && preReqs.length > 0) {
    const deleted_pre_rqisites = preReqs
      ?.filter((el) => el.course_id && el.isDeleted)
      .map((el) => el.course_id);

    const delete_pre_requisite_cources = await CourseModel.findByIdAndUpdate(
      id,
      {
        $pull: {
          pre_requisite_courses: { course_id: { $in: deleted_pre_rqisites } },
        },
      },
      {
        new: true,
      },
    );
    return delete_pre_requisite_cources;
  }

  return update_basic_course_info;
};

export const course_services = {
  create_course_from_db,
  get_courses_from_db,
  get_single_course_from_db,
  delete_course_from_db,
  update_course_from_db,
};
