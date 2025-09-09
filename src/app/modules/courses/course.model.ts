import { Schema, model } from 'mongoose';
import { TCourse, TPreRequisiteCourse } from './course.interface'; // adjust path if needed

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

export const CourseModel = model<TCourse>('Courses', courseSchema);
