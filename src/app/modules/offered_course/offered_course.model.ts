import { Schema, model } from 'mongoose';
import { TOffered_course } from './offered_course.interface';
import { days_constance } from './offered_course.constance';

const offeredCourseSchema = new Schema<TOffered_course>(
  {
    semester_registration: {
      type: Schema.Types.ObjectId,
      ref: 'Semester_registrations',
      required: true,
    },
    academic_semester: {
      type: Schema.Types.ObjectId,
      ref: 'Academic_Semesters',
      required: true,
    },
    academic_faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Academic_Faculties',
      required: true,
    },
    academic_department: {
      type: Schema.Types.ObjectId,
      ref: 'Academic_departments',
      required: true,
    },
    course: { type: Schema.Types.ObjectId, ref: 'Courses', required: true },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculties', required: true },
    max_capacity: { type: Number, required: true },
    section: { type: Number, required: true },
     days: [{ type: String, enum: days_constance, required: true }], // ✅ array
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
  },
  { timestamps: true },
);

export const Offered_Course_Model = model('Offered_courses', offeredCourseSchema);
