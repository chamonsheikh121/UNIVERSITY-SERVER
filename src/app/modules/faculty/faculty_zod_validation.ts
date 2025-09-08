import { z } from 'zod';

// Create Faculty Validation
export const create_faculty_zod_validation_schema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty_data: z.object({
      name: z.string(),
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.string(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      academicFaculty: z.string(),
      academicDepartmentId: z.string(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

// Update Faculty Validation (all fields optional)
export const update_faculty_zod_validation_schema = z.object({
  body: z.object({
    name: z.string().optional(),
    gender: z.enum(['male', 'female']).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    academicFaculty: z.string().optional(),
    academicDepartmentId: z.string().optional(),
  }),
});
