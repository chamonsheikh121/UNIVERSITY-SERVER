import z from 'zod';

export const auth_zod_validation_schema = z.object({
  body: z.object({
    auth_data: z.object({
      id: z.string(),
      password: z.string(),
    }),
  }),
});
