import { z } from 'zod';

const preRequisite_zod_validation_schema = z.object({
  course_id: z.string().min(1, 'course_id is required'),
  isDeleted: z.boolean().optional().default(false),
});

// Create course validation
export const create_course_zod_validation_schema = z.object({
  body: z.object({
    course_data: z.object({
      title: z.string().min(1, 'Title is required'),
      prefix: z.string().min(1, 'Prefix is required'),
      code: z.string().min(1, 'Code is required'),
      credit: z.string().min(1, 'Credit is required'),
      isDeleted: z.boolean().optional().default(false),
      pre_requisite_courses: z
        .array(preRequisite_zod_validation_schema)
        .optional(),
    }),
  }),
});

// Update course validation
export const update_course_zod_validation_schema = z.object({
  body: z.object({
    course_data: z.object({
      title: z.string().optional(),
      prefix: z.string().optional(),
      code: z.string().optional(),
      credit: z.string().optional(),
      isDeleted: z.boolean().optional(),
      pre_requisite_courses: z
        .array(preRequisite_zod_validation_schema)
        .optional(),
    }),
  }),
});
