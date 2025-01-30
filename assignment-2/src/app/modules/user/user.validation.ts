import { z } from "zod";

// Nested schemas
const fullNameSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

// Main user validation schema
const userValidationSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
  fullName: fullNameSchema,
  address: addressSchema,
  age: z.number().int().positive("Age must be a positive integer"),
  hobbies: z.array(z.string().min(1, "Hobby cannot be empty")),
  isActive: z.boolean(),
});

// Type export matching TUser interface
export type TUserValidation = z.infer<typeof userValidationSchema>;
export default userValidationSchema;
