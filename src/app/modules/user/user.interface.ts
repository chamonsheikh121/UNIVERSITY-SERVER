import { Model } from 'mongoose';

export type TUser = {
  id?: string;
  password: string;
  need_password_change?: boolean; // default true
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted?: boolean;
};

export type TNewUser = {
  password: string;
  id: string;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
};

export interface IUser extends Model<TUser> {
  is_user_exist_by_custom_id(id: string): Promise<TUser | null>;
}
