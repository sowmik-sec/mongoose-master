import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createRegistrationIntoDB = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester;
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(StatusCodes.CONFLICT, 'This semester is already exists');
  }
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  // check if the semester is exist
  if (!isAcademicSemesterExists) {
    throw new AppError(404, 'Academic semester not found');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

export const SemesterRegistrationService = {
  createRegistrationIntoDB,
};
