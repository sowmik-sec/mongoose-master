import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constant';
import mongoose from 'mongoose';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';

const createRegistrationIntoDB = async (payload: TSemesterRegistration) => {
  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */
  const academicSemester = payload?.academicSemester;

  // check if there any registered semester that is already 'UPCOMING' or 'ONGOING'
  const isThereAnyUpcomingOrOnGoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });
  if (isThereAnyUpcomingOrOnGoingSemester) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOnGoingSemester.status} registered semester!`,
    );
  }

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

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  const meta = await semesterRegistrationQuery.countTotal();
  return {
    result,
    meta,
  };
};
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSingleSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  /**
   * Step1: Check if the semester is exist
   * Step2: Check if the requested registered semester is exists
   * Step3: If the requested semester registration is ended, we will not update anything
   * Step4: If the requested semester registration is 'UPCOMING', we will let update everything.
   * Step5: If the requested semester registration is 'ONGOING', we will not update anything  except status to 'ENDED'
   * Step6: If the requested semester registration is 'ENDED' , we will not update anything
   *
   * UPCOMING --> ONGOING --> ENDED
   *
   */

  // check if the requested registered semester is exists
  // check if the semester is already registered!
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(StatusCodes.NOT_FOUND, `This semester is not found`);
  }

  // if the requested semester registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists.status;
  const requestedStatus = payload.status;
  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }
  // UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `You can't directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }
  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `You can't directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registration when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(404, 'This registered semester is not found!');
  }

  // check if the status is still "UPCOMING"
  const semesterRegistrationStatus = isSemesterRegistrationExists.status;
  if (semesterRegistrationStatus !== 'UPCOMING') {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `You can't delete the registered semester is ${semesterRegistrationStatus}`,
    );
  }
  const session = await mongoose.startSession();
  // delete associated offered courses
  try {
    session.startTransaction();
    const deletedOfferedCourse = await OfferedCourse.deleteMany(
      { semesterRegistration: id },
      { session },
    );
    if (!deletedOfferedCourse) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to delete semester registration!',
      );
    }
    const deletedSemesterRegistration =
      await SemesterRegistration.findByIdAndDelete(id, { session, new: true });
    if (!deletedSemesterRegistration) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to delete semester registration!',
      );
    }
    await session.commitTransaction();
    await session.endSession();
    return null;
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, (err as Error)?.message);
  }
};

export const SemesterRegistrationService = {
  createRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSingleSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
