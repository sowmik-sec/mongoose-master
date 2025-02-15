import mongoose from "mongoose";
import { z } from "zod";

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3, { message: "Category is required" }),
    createdBy: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid ObjectId",
    }),
  }),
});

const updateCategoryValidationSchema = createCategoryValidationSchema.partial();

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
