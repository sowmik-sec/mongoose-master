import { z } from "zod";

const loginUserZodSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "Username is required" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});
const changePasswordZodSchema = z.object({
  body: z.object({
    currentPassword: z.string({ required_error: "Old password is required" }),
    newPassword: z.string({ required_error: "New Password is required" }),
  }),
});

export const AuthValidations = {
  loginUserZodSchema,
  changePasswordZodSchema,
};
