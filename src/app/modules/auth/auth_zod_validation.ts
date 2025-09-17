import z from 'zod';

export const auth_login_zod_validation_schema = z.object({
  body: z.object({
    auth_data: z.object({
      id: z.string(),
      password: z.string(),
    }),
  }),
});

export const auth_change_pass_zod_validation_schema = z.object({
  body: z.object({
    password_data: z.object({
      old_password: z.string().min(1, ' old password is required'),
      new_password: z.string().min(1, 'new password is required'),
    }),
  }),
});

export const refresh_token_zod_validation_schema = z.object({
  cookies: z.object({
    refresh_token: z.string().min(1, 'refresh token is required'),
  }),
});
export const forget_password_zod_validation_schema = z.object({
  body: z.object({
    forget_pass_data: z.object({
      id: z.string().min(1, 'id is required'),
    }),
  }),
});

export const reset_password_zod_validation_schema = z.object({
  body: z.object({
    reset_pass_data: z.object({
      id: z.string().min(1, 'id is required'),
      new_password: z.string().min(1, 'new password is required'),
    }),
  }),
});
