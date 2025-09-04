import { Schema, model } from 'mongoose';
import {
  IStudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});
const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, IStudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: [true, 'User ID is required'],
      unique: true,
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    academic_semester_id: {
      type: Schema.Types.ObjectId,
      ref: 'Academic_Semesters',
    },
    academic_department_id: {
      type: Schema.Types.ObjectId,
      ref: 'Academic_departments',
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImage: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  },
);

studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// instance method
studentSchema.methods.isStudentExists = async function (id: string) {
  const isStudentExists = await StudentModel.findOne({ id });
  return isStudentExists;
};
// static method
studentSchema.statics.is_student_id_exist = async function (id: string) {
  const is_student_exist = await StudentModel.findOne({ id });
  return is_student_exist;
};
studentSchema.statics.is_student_email_exist = async function (email: string) {
  const is_student_exist = await StudentModel.findOne({ email });
  return is_student_exist;
};

// User ba data model a Data type er shate just model type ta add kore dite hobe.
const StudentModel = model<TStudent, IStudentModel>('Students', studentSchema);

export default StudentModel;
