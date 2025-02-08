import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseService } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseService.createCourseIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Course created successfully",
    data: result,
  });
});

export const CourseController = {
  createCourse,
};
