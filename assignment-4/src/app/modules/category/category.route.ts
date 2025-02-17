import express from "express";
import validateRequest from "../../utils/validateRequest";
import { CategoryValidation } from "./category.validation";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-category",
  auth("admin"),
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryController.createCategory
);

router.get("/", CategoryController.getAllCategories);

export const CategoryRoutes = router;
