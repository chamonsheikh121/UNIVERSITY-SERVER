import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: { type: String },
    password: { type: String, required: true },
    need_password_change: { type: Boolean, default: true },
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
  console.log('from middle ware', this);
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
  next();
});

const UserModel = model<TUser>('Users', userSchema);

export default UserModel;
