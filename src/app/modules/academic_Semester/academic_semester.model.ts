import { Schema, model } from 'mongoose';
import {
  months,
  semester_codes,
  semester_Names,
} from './academic_semester_constants';
import { TAcademic_Semester } from './academic_semester.interface';
import AppError from '../../errors/AppError';
import HttpStatus from 'http-status';

// enums

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
      type: String,
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

academicSemesterSchema.pre('save', async function (next) {
  const is_Academic_semester_exist = await Academic_Semester_Model.findOne({
    year: this.year,
    name: this.name,
    code: this.code,
  });
  if (is_Academic_semester_exist) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'semester already exist !!!');
  }
  next();
});

export const Academic_Semester_Model = model<TAcademic_Semester>(
  'Academic_Semesters',
  academicSemesterSchema,
);
