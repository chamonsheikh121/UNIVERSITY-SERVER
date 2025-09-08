import { Schema, model } from 'mongoose';
import { TFaculty } from './faculty.interface';

// Faculty Schema
const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'Academic_Faculties',
      required: true,
    },
    academicDepartmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Academic_departments',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  },
);

export const FacultyModel = model<TFaculty>('Faculties', facultySchema);
