import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';
import { StatusCodes } from 'http-status-codes';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course is created successfully',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Courses are retrieved successfully',
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getSingleCourseFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course is retrieved successfully',
    data: result,
  });
});
// const updateCourse = catchAsync(async (req, res) => {
//   const result = await CourseServices.updateCourseIntoDB(
//     req.params.id,
//     req.body,
//   );
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: 'Course is updated successfully',
//     data: result,
//   });
// });

const deleteCourse = catchAsync(async (req, res) => {
  const { AdminId } = req.params;
  const result = await CourseServices.deleteCourseFromDB(AdminId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Course deleted successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
};
