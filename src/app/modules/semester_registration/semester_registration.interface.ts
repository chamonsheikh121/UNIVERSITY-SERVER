import { Model, Types } from 'mongoose';

export type TSemesterRegistration = {
  academic_semester_id: Types.ObjectId;
  status: 'ONGOING' | 'ENDED' | 'UPCOMING';
  start_date: Date;
  end_date: Date;
  min_credit: number;
  max_credit: number;
};

export interface ISemester_Registration extends Model<TSemesterRegistration> {
  is_semester_registration_exist(
    academic_Semester_id: string,
  ): Promise<TSemesterRegistration | null>;
  is_semester_registration_id_exist(
    id: string,
  ): Promise<TSemesterRegistration | null>;
}
