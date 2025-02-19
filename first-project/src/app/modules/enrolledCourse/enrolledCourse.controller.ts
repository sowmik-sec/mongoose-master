import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseService } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledCourseService.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course enrolled successfully',
    data: result,
  });
});
const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const studentId = req.user.userId;
  const result = await EnrolledCourseService.getMyEnrolledCoursesFromDB(
    studentId,
    req.query,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Enrolled courses retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;
  const result = await EnrolledCourseService.updateEnrolledCourseMarksIntoDB(
    facultyId,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course enrollment is updated successfully',
    data: result,
  });
});

export const EnrolledCourseController = {
  createEnrolledCourse,
  getMyEnrolledCourses,
  updateEnrolledCourseMarks,
};
