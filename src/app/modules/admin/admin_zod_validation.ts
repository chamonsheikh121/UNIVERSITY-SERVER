import { z } from 'zod';
import { management_department } from './admin.constance';

export const create_admin_zod_validation_schema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin_data: z.object({
      designation: z.string().min(1, 'Designation is required'),
      name: z.object({
        firstName: z.string().min(1, 'First name is required'),
        middleName: z.string().optional(),
        lastName: z.string().min(1, 'Last name is required'),
      }),
      gender: z.enum(
        ['male', 'female'],
        'Gender must be either male or female',
      ),
      dateOfBirth: z.string().min(1, 'Date of birth is required'),
      email: z.string().email('Invalid email address'),
      contactNo: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required'),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      managementDepartment: z.enum(
        management_department,
        'Invalid management department',
      ),
    }),
  }),
});

export const update_admin_zod_validation_schema = z.object({
  body: z.object({
    admin_data: z.object({
      designation: z.string().optional(),
      name: z
        .object({
          firstName: z.string().optional(),
          middleName: z.string().optional(),
          lastName: z.string().optional(),
        })
        .optional(),
      gender: z.enum(['male', 'female']).optional(),
      dateOfBirth: z.string().optional(), // can refine to ISO date if needed
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      managementDepartment: z.enum(management_department).optional(),
    }),
  }),
});
