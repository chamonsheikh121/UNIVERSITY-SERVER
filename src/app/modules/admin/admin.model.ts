import { Schema, model } from 'mongoose';
import { TAdmin, TName } from './admin.interface';
import { management_department } from './admin.constance';

const nameSchema = new Schema<TName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const adminSchema = new Schema<TAdmin>(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    designation: { type: String, required: true },
    name: { type: nameSchema, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    managementDepartment: {
      type: String,
      enum: management_department,
      required: true,
    },

    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const AdminModel = model<TAdmin>('Admins', adminSchema);
