import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Student created successfully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Admin created successfully',
    data: result,
  });
});
const createFaculty = catchAsync(async (req, res) => {
  const { password, admin: facultyData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, facultyData);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Faculty created successfully',
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Token not found');
  }
  const result = await UserServices.getMe(token);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Get me successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createAdmin,
  createFaculty,
  getMe,
};
