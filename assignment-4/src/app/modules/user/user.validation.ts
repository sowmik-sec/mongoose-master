import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    // password: z
    //   .string()
    //   .min(6, "Password must be at least 6 characters long")
    //   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    //   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    //   .regex(/[0-9]/, "Password must contain at least one number")
    //   .regex(
    //     /[@$!%*?&]/,
    //     "Password must contain at least one special character (@$!%*?& etc.)"
    //   ),
    password: z.string().min(4, "Password must be at least 4 characters"),
    role: z.enum(["user", "admin"]).default("user"),
  }),
});

export const UserValidations = {
  createUserZodSchema,
};
