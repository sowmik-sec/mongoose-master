import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

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

export const UserControllers = {
  createStudent,
  createAdmin,
};
