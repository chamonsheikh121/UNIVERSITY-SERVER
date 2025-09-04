import { Model, ObjectId, Types } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  userId: Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  academic_semester_id: Types.ObjectId;
  academic_department_id: Types.ObjectId;
  profileImage?: string;
  isDeleted?: boolean;
};

// Interface.ts a Type banaite hobe function er.
export type TStudentMethods = {
  isStudentExists(id: string): Promise<TStudent | null>;
};

export interface IStudentModel extends Model<TStudent> {
  is_student_id_exist(id: string): Promise<TStudent | null>;
  is_student_email_exist(email: string): Promise<TStudent | null>;
}

// Interface.ts a Aro akti type banaite hobe Model import kore.
export type TStudentModel = Model<
  TStudent,
  Record<string, never>,
  TStudentMethods
>;
