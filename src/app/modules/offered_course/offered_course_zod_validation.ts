import { z } from 'zod';
import { days_constance } from './offered_course.constance';

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
        start_time: z.string().refine(
          (time) => {
            const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
            return regex.test(time);
          },
          {
            message: 'please input a valid time format e.g, 12:40',
          },
        ),
        end_time: z.string().refine(
          (time) => {
            const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
            return regex.test(time);
          },
          {
            message: 'please input a valid time format e.g, 12:40',
          },
        ),
      })
      .refine((offered_course_data) => {
        const start = new Date(`1970-01-01${offered_course_data.start_time}`);
        const end = new Date(`1970-01-01${offered_course_data.end_time}`);

        return end > start;
      },{
        message: 'end time must be greater than start time'
      }),
  }),
});

const offered_course_zod_validation = {
  create_offered_course_zod_validation_schema,
};

export default offered_course_zod_validation;
