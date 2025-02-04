import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { FacultyServices } from './faculty.service';

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDb(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Faculties retrieved successfully',
    data: result,
  });
});
const getSingleFaculty = catchAsync(async (req, res) => {
  const { FacultyId } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDb(FacultyId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Faculty retrieved successfully',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req, res) => {
  const { FacultyId } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB(FacultyId, faculty);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Faculty updated successfully',
    data: result,
  });
});
const deleteSingleFaculty = catchAsync(async (req, res) => {
  const { FacultyId } = req.params;
  const result = await FacultyServices.deleteSingleFacultyFromDb(FacultyId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Faculty deleted successfully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteSingleFaculty,
};
