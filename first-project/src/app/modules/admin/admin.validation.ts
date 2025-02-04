import { Types } from 'mongoose';
import { z } from 'zod';

// Helper schema for ObjectId validation
const objectIdSchema = z.string().refine((value) => {
  return Types.ObjectId.isValid(value);
}, 'Invalid ObjectId');

// Name schema
const nameSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

// Blood group enum
const bloodGroupEnum = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]);

// Main admin schema
const createAdminValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .optional(),
    admin: z.object({
      id: z.string().min(1, 'ID is required'),
      user: objectIdSchema,
      designation: z.string().min(1, 'Designation is required'),
      name: nameSchema,
      gender: z.enum(['male', 'female'], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.coerce.date().optional(),
      email: z.string().email('Invalid email address'),
      contactNo: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required'),
      bloodGroup: bloodGroupEnum.optional(),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      profileImg: z.string().min(1, 'Profile image is required'),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

// Update schema (all fields optional)
const updateAdminValidationSchema = createAdminValidationSchema.partial();

// Export schemas
export const AdminValidation = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
