import { Schema, model } from 'mongoose';
import { IUser, TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, IUser>(
  {
    id: { type: String },
    password: { type: String, required: true, select: 0 },
    need_password_change: { type: Boolean, default: true },
    last_pass_changed_at: { type: Date },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
  next();
});

userSchema.statics.is_user_exist_by_custom_id = async function (id: string) {
  const user = await this.findOne({ id }).select('+password');
  return user;
};
userSchema.statics.validate_password = async function (
  original_password,
  hashed_password,
) {
  const is_password_match = await bcrypt.compare(
    original_password,
    hashed_password,
  );
  return is_password_match;
};

const UserModel = model<TUser, IUser>('Users', userSchema);

export default UserModel;
