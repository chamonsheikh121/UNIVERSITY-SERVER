import { Types } from 'mongoose';

export type TPreRequisiteCourse = {
  course_id: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: string;
  credit: string;
  isDeleted: boolean;
  pre_requisite_courses: [TPreRequisiteCourse];
};

export type TCourse_faculties = {
  course_id: Types.ObjectId;
  faculties: [Types.ObjectId];
};
