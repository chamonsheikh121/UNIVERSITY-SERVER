import { Types } from 'mongoose';

export interface TName {
  firstName: string;
  middleName?: string;
  lastName: string;
}
export type TManagementDepartment =
  | 'Admissions'
  | 'Finance'
  | 'HR'
  | 'Examinations'
  | 'Library'
  | 'Student Affairs'
  | 'IT'
  | 'Facilities';

export interface TAdmin {
  id: string;
  userId: Types.ObjectId;
  designation: string;
  name: TName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  managementDepartment: TManagementDepartment;
  isDeleted: boolean;
}
