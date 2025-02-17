import express from "express";
import validateRequest from "../../utils/validateRequest";
import { ReviewValidation } from "./review.validation";
import { ReviewController } from "./review.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-review",
  auth("user"),
  validateRequest(ReviewValidation.createReviewValidation),
  ReviewController.createCategory
);

export const ReviewRoutes = router;
