import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Faculty is created successfully',
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB(
    req.query,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Faculties are retrieved successfully',
    meta: result?.meta,
    data: result?.result,
  });
});
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDb(
    req.params.id,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Faculty is retrieved successfully',
    data: result,
  });
});
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Faculty is updated successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
