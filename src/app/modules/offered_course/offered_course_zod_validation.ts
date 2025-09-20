import { z } from 'zod';
import { days_constance } from './offered_course.constance';

const start_time_validation_schema = z.string().refine(
  (time) => {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return regex.test(time);
  },
  {
    message: 'please input a valid time format e.g, 12:40',
  },
);

const end_time_validation_schema = z.string().refine(
  (time) => {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return regex.test(time);
  },
  {
    message: 'please input a valid time format e.g, 12:40',
  },
);

const create_offered_course_zod_validation_schema = z.object({
  body: z.object({
    offered_course_data: z
      .object({
        semester_registration: z.string(),
        academic_faculty: z.string(),
        academic_department: z.string(),
        course: z.string(),
        faculty: z.string(),
        max_capacity: z.number(),
        section: z.number(),
        days: z.array(z.enum([...days_constance] as [string, ...string[]])),
        start_time: start_time_validation_schema,
        end_time: end_time_validation_schema,
      })
      .refine(
        (offered_course_data) => {
          const start = new Date(
            `1970-01-01T${offered_course_data.start_time}:00`,
          );
          const end = new Date(`1970-01-01T${offered_course_data.end_time}:00`);

          return end > start;
        },
        {
          message: 'end time must be greater than start time',
        },
      ),
  }),
});

const update_offered_course_zod_validation_schema = z.object({
  body: z.object({
    offered_course_update_data: z
      .object({
        faculty: z.string().optional(),
        max_capacity: z.number().optional(),
        section: z.number().optional(),
        days: z
          .array(z.enum([...days_constance] as [string, ...string[]]))
          .optional(),
        start_time: start_time_validation_schema.optional(),
        end_time: end_time_validation_schema.optional(),
      })
      .refine(
        (offered_course_data) => {
          const start = new Date(
            `1970-01-01T${offered_course_data.start_time}:00`,
          );
          const end = new Date(`1970-01-01T${offered_course_data.end_time}:00`);

          return end > start;
        },
        {
          message: 'end time must be greater than start time',
        },
      ),
  }),
});

const offered_course_zod_validation = {
  create_offered_course_zod_validation_schema,
  update_offered_course_zod_validation_schema,
};
export default offered_course_zod_validation;
