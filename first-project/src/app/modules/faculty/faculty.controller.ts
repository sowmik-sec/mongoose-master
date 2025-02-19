import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { FacultyServices } from './faculty.service';

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Faculties retrieved successfully',
    meta: result?.meta,
    data: result?.result,
  });
});
const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDb(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Faculty retrieved successfully',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB(id, faculty);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Faculty updated successfully',
    data: result,
  });
});
const deleteSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.deleteSingleFacultyFromDb(id);
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
