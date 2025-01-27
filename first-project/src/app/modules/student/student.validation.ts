import { z } from 'zod';

// UserName ValidationSchema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'First name cannot be more than 20 characters' })
    .regex(/^[A-Z][a-z]*$/, {
      message: 'First name must be in capitalized format',
    })
    .transform((val) => (val ? val.trim() : val)),
  middleName: z
    .string()
    .optional()
    .transform((val) => (val ? val.trim() : val)),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .regex(/^[A-Za-z]+$/, { message: 'Last name must contain only alphabets' })
    .transform((val) => (val ? val.trim() : val)),
});

// Guardian ValidationSchema
const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(1, { message: "Father's name is required" })
    .transform((val) => (val ? val.trim() : val)),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father's occupation is required" })
    .transform((val) => (val ? val.trim() : val)),
  fatherContactNo: z
    .string()
    .min(1, { message: "Father's contact number is required" })
    .transform((val) => (val ? val.trim() : val)),
  motherName: z
    .string()
    .min(1, { message: "Mother's name is required" })
    .transform((val) => (val ? val.trim() : val)),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother's occupation is required" })
    .transform((val) => (val ? val.trim() : val)),
  motherContactNo: z
    .string()
    .min(1, { message: "Mother's contact number is required" })
    .transform((val) => (val ? val.trim() : val)),
});

// Local Guardian ValidationSchema
const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Local guardian's name is required" })
    .transform((val) => (val ? val.trim() : val)),
  occupation: z
    .string()
    .min(1, { message: "Local guardian's occupation is required" })
    .transform((val) => (val ? val.trim() : val)),
  contactNo: z
    .string()
    .min(1, { message: "Local guardian's contact number is required" })
    .transform((val) => (val ? val.trim() : val)),
  address: z
    .string()
    .min(1, { message: "Local guardian's address is required" })
    .transform((val) => (val ? val.trim() : val)),
});

// Main Student ValidationSchema
const studentValidationSchema = z.object({
  id: z
    .string()
    .min(1, { message: 'Student ID is required' })
    .transform((val) => (val ? val.trim() : val)),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Only "male" or "female" is allowed' }),
  }),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email address is required' })
    .transform((val) => (val ? val.trim() : val)),
  dateOfBirth: z
    .string()
    .optional()
    .transform((val) => (val ? val.trim() : val)),
  contactNo: z
    .string()
    .min(1, { message: 'Contact number is required' })
    .transform((val) => (val ? val.trim() : val)),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      errorMap: () => ({ message: 'Invalid blood group' }),
    })
    .optional(),
  presentAddress: z
    .string()
    .min(1, { message: 'Present address is required' })
    .transform((val) => (val ? val.trim() : val)),
  permanentAddress: z
    .string()
    .min(1, { message: 'Permanent address is required' })
    .transform((val) => (val ? val.trim() : val)),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  emergencyContactNo: z
    .string()
    .min(1, { message: 'Emergency contact number is required' })
    .transform((val) => (val ? val.trim() : val)),
  profileImg: z
    .string()
    .min(1, { message: 'Profile image is required' })
    .transform((val) => (val ? val.trim() : val)),
  isActive: z
    .enum(['active', 'block'], {
      errorMap: () => ({ message: 'Only "active" or "block" is allowed' }),
    })
    .default('active'),
});

export default studentValidationSchema;
