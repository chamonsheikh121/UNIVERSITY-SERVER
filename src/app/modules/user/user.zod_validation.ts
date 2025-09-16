import { z } from 'zod';
import { user_status_constance } from './user.constance';

export const user_zod_validation_schema = z.object({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long'),
});

export const user_satus_change_zod_validation_schema = z.object({
  body: z.object({
    change_status_data: z.object({
      status: z.enum(user_status_constance),
    }),
  }),
});
