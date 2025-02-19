import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { OfferedCourseServices } from './offeredCourse.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered Course is created successfully !',
    data: result,
  });
});
const getAllOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered Courses retrieved successfully !',
    meta: result?.meta,
    data: result?.result,
  });
});
const getMyOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.getMyOfferedCoursesFromDB(
    req.user.userId,
    req.query,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered Courses retrieved successfully !',
    data: result,
  });
});
const getSingleOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(
      req.params.id,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Offered Course retrieved successfully !',
      data: result,
    });
  },
);
const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered Course updated successfully !',
    data: result,
  });
});
const deleteOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.deleteOfferedCourseFromDB(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered Course deleted successfully !',
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourse,
  getMyOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};
