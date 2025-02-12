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
    message: 'Course is created successfully',
    data: result,
  });
});
const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;
  const result = await EnrolledCourseService.createEnrolledCourseIntoDB(
    facultyId,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course is created successfully',
    data: result,
  });
});

export const EnrolledCourseController = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
};
