import { Schema, model } from 'mongoose';
import {
  TCourse,
  TCourse_faculties,
  TPreRequisiteCourse,
} from './course.interface'; // adjust path if needed

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourse>({
  course_id: {
    type: Schema.Types.ObjectId,
    ref: 'Courses',
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    prefix: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    credit: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    pre_requisite_courses: {
      type: [preRequisiteCourseSchema],
      default: [],
    },
  },
  { timestamps: true },
);

const course_facultiesSchema = new Schema<TCourse_faculties>({
  course_id: {
    type: Schema.Types.ObjectId,
    ref: 'Courses',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculties',
    },
  ],
});

export const Course_Faculties_Model = model<TCourse_faculties>(
  'course_faculties',
  course_facultiesSchema,
);

export const CourseModel = model<TCourse>('Courses', courseSchema);
