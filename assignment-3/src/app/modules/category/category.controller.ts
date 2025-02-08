import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryService } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.createCategoryIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Category created successfully",
    data: result,
  });
});
const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryService.getAllCategoriesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Categories retrieved successfully",
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategories,
};
