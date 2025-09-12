import { z } from 'zod';
import { semester_registration_status } from './semester_registration.constance';

// Zod schema for Semester Registration
export const create_semester_registration_validation_schema = z.object({
  body: z.object({
    semester_resgistration_data: z.object({
      academic_semester_id: z.string().min(1, 'Academic Semester is required'),
      status: z.enum(semester_registration_status).default('UPCOMING'),
      start_date: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
          message: 'Invalid start date',
        })
        .transform((date) => new Date(date)),
      end_date: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
          message: 'Invalid start date',
        })
        .transform((date) => new Date(date)),
      min_credit: z.number(),
      max_credit: z.number(),
    }),
  }),
});

// ✅ For updating semester registration (all optional)
export const updateSemesterRegistrationSchema = z.object({
  body: create_semester_registration_validation_schema.partial(),
});
