import { z } from "zod";

const createReviewValidation = z.object({
  body: z.object({
    rating: z.number({ invalid_type_error: "Rating is required" }),
    review: z
      .string()
      .min(1, { message: "Review must be at least 1 characters" }),
  }),
});

const updateReviewValidation = createReviewValidation.partial();

export const ReviewValidation = {
  createReviewValidation,
  updateReviewValidation,
};
