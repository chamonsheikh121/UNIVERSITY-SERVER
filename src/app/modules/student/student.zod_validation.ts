import { Schema } from 'mongoose';
import { z } from 'zod';

// UserName schema
const userName_zod_validation_schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
});

// Guardian schema
const guardian_zod_validation_schema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  fatherOccupation: z.string().min(1, 'Father occupation is required'),
  fatherContactNo: z.string().min(1, 'Father contact number is required'),
  motherName: z.string().min(1, 'Mother name is required'),
  motherOccupation: z.string().min(1, 'Mother occupation is required'),
  motherContactNo: z.string().min(1, 'Mother contact number is required'),
});

// Local Guardian schema
const localGuardian_zod_validation_schema = z.object({
  name: z.string().min(1, 'Local guardian name is required'),
  occupation: z.string().min(1, 'Local guardian occupation is required'),
  contactNo: z.string().min(1, 'Local guardian contact number is required'),
  address: z.string().min(1, 'Local guardian address is required'),
});

// Main Student schema
export const student_zod_validation_schema = z.object({
  id: z.string().min(1, 'Student ID is required'),
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: [true, 'User ID is required'],
    unique: true,
  },

  name: userName_zod_validation_schema,
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  email: z.string().email('Invalid email address'),
  contactNo: z.string().min(1, 'Contact number is required'),
  emergencyContactNo: z.string().min(1, 'Emergency contact number is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    .optional(),
  presentAddress: z.string().min(1, 'Present address is required'),
  permanentAddress: z.string().min(1, 'Permanent address is required'),
  guardian: guardian_zod_validation_schema,
  localGuardian: localGuardian_zod_validation_schema,
  profileImage: z.string().optional(),
  isDeleted: z.boolean().default(false),
});
