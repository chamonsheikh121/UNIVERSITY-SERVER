import { z } from 'zod';
import {
  months,
  semester_codes,
  semester_Names,
} from './academic_semester.model';

const academic_semester_zod_validation_schema = z.object({
  body: z.object({
    name: z.enum(semester_Names),
    code: z.enum(semester_codes),
    year: z.date(),
    start_month: z.enum(months),
    end_month: z.enum(months),
  }),
});

export const academic_semester_zod_validation = {
  academic_semester_zod_validation_schema,
};
