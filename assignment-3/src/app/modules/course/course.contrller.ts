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
const getCourses = catchAsync(async (req, res) => {
  const result = await CourseService.getCoursesFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Course retrieved successfully",
    data: result,
  });
});
const getCourseWithReview = catchAsync(async (req, res) => {
  const result = await CourseService.getCourseWithReviewFromDB(
    req.params.courseId
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Course with review retrieved successfully",
    data: result,
  });
});
const getBestCourse = catchAsync(async (req, res) => {
  const result = await CourseService.getBestCourseFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Best course  retrieved successfully",
    data: result,
  });
});
const updateCourse = catchAsync(async (req, res) => {
  const result = await CourseService.updateCourseIntoDB(
    req.params.id,
    req.query
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Course updated successfully",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getCourses,
  getCourseWithReview,
  getBestCourse,
  updateCourse,
};
