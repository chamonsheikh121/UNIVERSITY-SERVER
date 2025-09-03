import { Schema, model } from 'mongoose';
import {
  TAcademic_Semester,
  TMonth,
  TSemester_Code,
  TSemester_Name,
} from './academic_Semester.interface';

// enums

export const semester_Names: TSemester_Name[] = ['Autumn', 'Summer', 'Fall'];
export const semester_codes: TSemester_Code[] = ['01', '02', '03'];
export const months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Define schema
const academicSemesterSchema = new Schema<TAcademic_Semester>(
  {
    name: {
      type: String,
      enum: semester_Names,
      required: true,
    },
    code: {
      type: String,
      enum: semester_codes,
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    start_month: {
      type: String,
      enum: months,
      required: true,
    },
    end_month: {
      type: String,
      enum: months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicSemester = model<TAcademic_Semester>(
  'AcademicSemesters',
  academicSemesterSchema,
);
