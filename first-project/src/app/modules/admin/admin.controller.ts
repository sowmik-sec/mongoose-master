import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDb(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Admins retrieved successfully',
    data: result,
  });
});
const getSingleAdmin = catchAsync(async (req, res) => {
  const { AdminId } = req.params;
  const result = await AdminServices.getSingleAdminFromDb(AdminId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Admin retrieved successfully',
    data: result,
  });
});
const updateAdmin = catchAsync(async (req, res) => {
  const { AdminId } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(AdminId, admin);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Admin updated successfully',
    data: result,
  });
});
const deleteSingleAdmin = catchAsync(async (req, res) => {
  const { AdminId } = req.params;
  const result = await AdminServices.deleteSingleAdminFromDb(AdminId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Admin deleted successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteSingleAdmin,
};
