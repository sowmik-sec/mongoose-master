import { z } from 'zod';
import { Types } from 'mongoose';

// Helper schema for ObjectId validation
const objectIdSchema = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId',
  });

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

// Main faculty schema
const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    faculty: z.object({
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
      academicDepartment: objectIdSchema,
    }),
  }),
});

// Update schema (all fields optional)
const updateFacultyValidationSchema = createFacultyValidationSchema.partial();

export const FacultyValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
