import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  console.log(req.file, 'file');
  console.log(req.body, 'json data');
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(
    req.file,
    password,
    studentData,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Student created successfully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Admin created successfully',
    data: result,
  });
});
const createFaculty = catchAsync(async (req, res) => {
  const { password, admin: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(
    req.file,
    password,
    facultyData,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Faculty created successfully',
    data: result,
  });
});
const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.changeStatusIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Status changed successfully',
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  // const token = req.headers.authorization;
  // if (!token) {
  //   throw new AppError(StatusCodes.NOT_FOUND, 'Token not found');
  // }
  // console.log(req.user);
  const { userId, role } = req.user;
  const result = await UserServices.getMe(userId, role);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User is retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createAdmin,
  createFaculty,
  getMe,
  changeStatus,
};
