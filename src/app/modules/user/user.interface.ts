import { Model } from 'mongoose';
import { user_roles } from './user.constance';

export type TUser = {
  id?: string;
  password: string;
  need_password_change?: boolean; // default true
  last_pass_changed_at?: Date; // default true
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
  validate_password(
    original_password: string,
    hashed_password: string,
  ): Promise<boolean>;
  last_login_and_pass_update_comparision(
    last_pass_update_time: Date,
    last_login_time: number,
  ): boolean;
}

export type TUser_Role = keyof typeof user_roles;
