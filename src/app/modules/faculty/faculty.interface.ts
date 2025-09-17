import { Types } from 'mongoose';

export interface TFaculty {
  id: string;
  userId: Types.ObjectId;
  name: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  academicFaculty: object;
  academicDepartmentId: object;
  profile_image: string;
  isDeleted: boolean;
}
