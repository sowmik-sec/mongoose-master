import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Department is created successfully',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDb();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Departments are retrieved successfully',
    data: result,
  });
});
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDb(
      req.params.id,
    );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Department is retrieved successfully',
    data: result,
  });
});
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      req.params.id,
      req.body,
    );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Department is updated successfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
