import { Types } from 'mongoose';

export type TCourseMarks = {
  class_test_1: number;
  midterm: number;
  class_test_2: number;
  final: number;
};

export type TGrade = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type TEnrolledCourse = {
  semester_registration: Types.ObjectId;
  academic_semester: Types.ObjectId;
  academic_faculty: Types.ObjectId;
  academic_department: Types.ObjectId;
  offered_course: Types.ObjectId;
  course: Types.ObjectId;
  student: Types.ObjectId;
  faculty: Types.ObjectId;
  is_enrolled: boolean;
  course_marks?: TCourseMarks;
  grade?: TGrade;
  grade_points?: number;
  is_completed?: boolean;
};
