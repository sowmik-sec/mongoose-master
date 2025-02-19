import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';
import { StatusCodes } from 'http-status-codes';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Semester is created successfully',
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDb(
    req.params.id,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Semester is retrieved successfully',
    data: result,
  });
});
const updateAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Semester is updated successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
