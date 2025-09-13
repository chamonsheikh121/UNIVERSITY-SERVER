import { Types } from 'mongoose';

// Enum for days of the week
export type Day = 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';

// Type for Semester Registration
export type TOffered_course = {
  semester_registration: Types.ObjectId;
  academic_semester: Types.ObjectId;
  academic_faculty: Types.ObjectId;
  academic_department: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  max_capacity: number;
  section: number;
  days: Day[];
  start_time: string;
  end_time: string;
};
