import express from "express";
import validateRequest from "../../utils/validateRequest";
import { ReviewValidation } from "./review.validation";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post(
  "/create-category",
  validateRequest(ReviewValidation.createReviewValidation),
  ReviewController.createCategory
);

export const ReviewRoutes = router;
