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
export const create_student_zod_validation_schema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, 'password must be at least 6 character long')
      .optional(),
    student_data: z.object({
      name: userName_zod_validation_schema,
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.string().min(1, 'Date of birth is required').optional(),
      email: z.string().email('Invalid email address'),
      contactNo: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      academic_department_id: z.string(),
      academic_semester_id: z.string(),
      guardian: guardian_zod_validation_schema,
      localGuardian: localGuardian_zod_validation_schema,
      profileImage: z.string().optional(),
    }),
  }),
});

// UserName schema (all optional for update)
const update_userName_zod_validation_schema = z.object({
  firstName: z.string().min(1).optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1).optional(),
});

// Guardian schema (all optional for update)
const update_guardian_zod_validation_schema = z.object({
  fatherName: z.string().min(1).optional(),
  fatherOccupation: z.string().min(1).optional(),
  fatherContactNo: z.string().min(1).optional(),
  motherName: z.string().min(1).optional(),
  motherOccupation: z.string().min(1).optional(),
  motherContactNo: z.string().min(1).optional(),
});

// Local Guardian schema (all optional for update)
const update_localGuardian_zod_validation_schema = z.object({
  name: z.string().min(1).optional(),
  occupation: z.string().min(1).optional(),
  contactNo: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
});

// Main Student update schema
export const update_student_zod_validation_schema = z.object({
  body: z.object({
    student_data: z
      .object({
        name: update_userName_zod_validation_schema.optional(),
        gender: z.enum(['male', 'female']).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email().optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
          .optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        academic_department_id: z.string().optional(),
        academic_semester_id: z.string().optional(),
        guardian: update_guardian_zod_validation_schema.optional(),
        localGuardian: update_localGuardian_zod_validation_schema.optional(),
        profileImage: z.string().optional(),
      })
      .optional(),
  }),
});
