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

router.get("/", CategoryController.getAllCategories);

export const CategoryRoutes = router;
