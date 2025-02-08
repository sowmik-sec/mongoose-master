import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewServices } from "./review.service";

const createCategory = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Review created successfully",
    data: result,
  });
});
export const ReviewController = {
  createCategory,
};
