import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>(
  {
    id: { type: String, required: [true, 'Student ID is required'], unique: true },
    name: { 
      type: userNameSchema, 
      required: [true, 'Student name is required'] 
    },
    gender: { 
      type: String, 
      enum: ['male', 'female'], 
      required: [true, 'Gender is required'] 
    },
    dateOfBirth: { type: String, required: [true, 'Date of birth is required'] },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: { type: String, required: [true, 'Emergency contact number is required'] },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', '0-'],
    },
    presentAddress: { type: String, required: [true, 'Present address is required'] },
    permanentAddress: { type: String, required: [true, 'Permanent address is required'] },
    guardian: { type: guardianSchema, required: [true, 'Guardian information is required'] },
    localGuardian: { type: localGuardianSchema, required: [true, 'Local guardian information is required'] },
    profileImage: { type: String },
    isActive: { type: String, enum: ['active', 'block'], default: 'active' },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  },
);


const StudentModel = model<Student>('Students', studentSchema);

export default StudentModel;
