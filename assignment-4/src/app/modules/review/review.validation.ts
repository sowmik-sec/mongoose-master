import mongoose from "mongoose";
import { z } from "zod";

const createReviewValidation = z.object({
  body: z.object({
    courseId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid course ID format" })
      .min(1, { message: "Course ID is required" }),
    rating: z
      .number({
        required_error: "Rating is required",
        invalid_type_error: "Rating must be a number",
      })
      .min(1, { message: "Rating must be at least 1" })
      .max(5, { message: "Rating cannot exceed 5" }),
    review: z
      .string()
      .min(1, { message: "Review text is required" })
      .trim()
      .refine((val) => val.length > 0, "Review cannot be empty"),
    createdBy: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid ObjectId",
    }),
  }),
});

const updateReviewValidation = createReviewValidation.partial();

export const ReviewValidation = {
  createReviewValidation,
  updateReviewValidation,
};
