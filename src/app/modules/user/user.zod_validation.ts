import { z } from 'zod';

export const user_zod_validation_schema = z.object({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long'),
});
