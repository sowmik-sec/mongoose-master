import { z } from 'zod';

export const userValidationSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, { message: 'password can not be more than 20 characters' }),
  role: z.enum(['admin', 'student', 'faculty']),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  needsPasswordChange: z.boolean().default(true).optional(),
  isDeleted: z.boolean().default(false).optional(),
});

export const UserValidation = {
  userValidationSchema,
};
