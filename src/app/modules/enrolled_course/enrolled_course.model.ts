import { Schema, model } from 'mongoose';
import { TEnrolledCourse } from './enrolled_course.interface'; // adjust path as needed
import { grades } from './enrolled_course_constants';

// Subschema for course marks
const courseMarksSchema = new Schema(
  {
    class_test_1: { type: Number, required: true, default: 0 },
    midterm: { type: Number, required: true, default: 0 },
    class_test_2: { type: Number, required: true, default: 0 },
    final: { type: Number, required: true, default: 0 },
  },
  {
    _id: false,
  },
);

const enrolledCourseSchema = new Schema<TEnrolledCourse>(
  {
    semester_registration: {
      type: Schema.Types.ObjectId,
      ref: 'Semester_registrations',
      required: true,
    },
    academic_faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Academic_Faculties',
      required: true,
    },
    academic_semester: {
      type: Schema.Types.ObjectId,
      ref: 'Academic_Semesters',
      required: true,
    },
    academic_department: {
      type: Schema.Types.ObjectId,
      ref: 'Academic_departments',
      required: true,
    },
    offered_course: {
      type: Schema.Types.ObjectId,
      ref: 'Offered_courses',
      required: true,
    },
    course: { type: Schema.Types.ObjectId, ref: 'Courses', required: true },
    student: { type: Schema.Types.ObjectId, ref: 'Students', required: true },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculties', required: true },
    is_enrolled: { type: Boolean, default: true },
    course_marks: { type: courseMarksSchema },
    grade: { type: String, enum: grades , default:"NA"},
    grade_points: { type: Number, default:0, min:0, max: 4 },
    is_completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const EnrolledCourse = model<TEnrolledCourse>(
  'Enrolled_courses',
  enrolledCourseSchema,
);
