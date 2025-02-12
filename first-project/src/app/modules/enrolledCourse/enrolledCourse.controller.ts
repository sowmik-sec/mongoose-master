import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseService } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const result = await EnrolledCourseService.createEnrolledCourseIntoDB(
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
};
