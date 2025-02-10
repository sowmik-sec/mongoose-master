import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SemesterRegistrationService.createRegistrationIntoDB(
      req.body,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Semester Registration is created successfully',
      data: result,
    });
  },
);
const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrationFromDB(
        req.query,
      );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Semester Registration retrieved successfully',
      data: result,
    });
  },
);
const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrationFromDB(
        req.params,
      );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Semester Registration retrieved successfully',
      data: result,
    });
  },
);
const updateSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.updateSingleSemesterRegistrationIntoDB(
        req.params.id,
        req.body,
      );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Semester Registration retrieved successfully',
      data: result,
    });
  },
);
const deleteSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.deleteSemesterRegistrationFromDB(
        req.params.id,
      );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Semester Registration deleted successfully',
      data: result,
    });
  },
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSingleSemesterRegistration,
  deleteSemesterRegistration,
};
