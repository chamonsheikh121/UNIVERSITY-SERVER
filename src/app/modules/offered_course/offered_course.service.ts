import AppError from '../../errors/AppError';
import Academic_Department_Model from '../academic_department/academic_department.model';
import { Academic_Faculty_Model } from '../academic_faculty/academic_faculty.model';
import { CourseModel } from '../courses/course.model';
import { FacultyModel } from '../faculty/faculty.model';
import { SemesterRegistrationModel } from '../semester_registration/semester_registration.model';
import { Offered_Course_Model } from './offered_course.model';
import HttpStatus from 'http-status';

const create_offered_course_to_db = async (payload: any) => {
  const {
    semester_registration,
    academic_faculty,
    academic_department,
    course,
    section,
    faculty,
  } = payload;

  const is_semester_registration_exist =
    await SemesterRegistrationModel.findById(semester_registration);

  if (!is_semester_registration_exist) {
    throw new AppError(
      HttpStatus.BAD_REQUEST,
      'No semester registration found',
    );
  }
  const is_academic_faculty_exist =
    await Academic_Faculty_Model.findById(academic_faculty);

  if (!is_academic_faculty_exist) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'No academic faculty found');
  }

  const is_academic_department_exist =
    await Academic_Department_Model.findById(academic_department);

  if (!is_academic_department_exist) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'No academic department found');
  }
  const is_course_exist = await CourseModel.findById(course);

  if (!is_course_exist) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'No course found');
  }

  const is_faculty_exist = await FacultyModel.findById(faculty);

  if (!is_faculty_exist) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'No faculty found');
  }

  const is_same_course_semester_registration_section =
    await Offered_Course_Model.findOne({
      semester_registration,
      course,
      section,
    });
  if (is_same_course_semester_registration_section) {
    throw new AppError(
      HttpStatus.BAD_REQUEST,
      `${is_semester_registration_exist.status} semester registration's course of ${is_course_exist.title}'s section ${section} already exist`,
    );
  }

  const is_Department_belong_faculty = await Academic_Department_Model.findOne({
    _id: academic_department,
    academic_faculty_id: academic_faculty,
  });

  if (!is_Department_belong_faculty) {
    throw new AppError(
      HttpStatus.BAD_REQUEST,
      `this department of ${is_academic_department_exist?.name} is not belong to faculty of ${is_academic_faculty_exist?.name}`,
    );
  }

  const academic_semester =
    is_semester_registration_exist?.academic_semester_id;

  const result = await Offered_Course_Model.create({
    ...payload,
    academic_semester,
  });
  return result;
};

//  const getAllOfferedCourses = async () => {
//   const courses = await OfferedCourse.find().populate([
//     "semester_registration",
//     "academic_semester",
//     "academic_faculty",
//     "academic_department",
//     "course",
//     "faculty",
//   ]);
//   return courses;
// };

//  const getSingleOfferedCourse = async (id: string) => {
//   const course = await OfferedCourse.findById(id).populate([
//     "semester_registration",
//     "academic_semester",
//     "academic_faculty",
//     "academic_department",
//     "course",
//     "faculty",
//   ]);
//   return course;
// };

//  const deleteOfferedCourse = async (id: string) => {
//   const course = await OfferedCourse.findByIdAndDelete(id);
//   return course;
// };

export const offered_course_services = {
  create_offered_course_to_db,
};
