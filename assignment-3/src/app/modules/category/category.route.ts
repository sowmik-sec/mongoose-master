import express from "express";
import validateRequest from "../../utils/validateRequest";
import { CategoryValidation } from "./category.validation";
import { CategoryController } from "./category.controller";

const router = express.Router();

router.post(
  "/create-category",
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryController.createCategory
);

export const CategoryRoutes = router;
