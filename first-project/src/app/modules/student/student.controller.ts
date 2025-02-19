import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDb(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDb(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Student retrieved successfully',
    data: result,
  });
});
const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(id, student);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Student updated successfully',
    data: result,
  });
});
const deleteSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteSingleStudentFromDb(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Student deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteSingleStudent,
};
