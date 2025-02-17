import { z } from "zod";

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3, { message: "Category is required" }),
  }),
});

const updateCategoryValidationSchema = createCategoryValidationSchema.partial();

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
