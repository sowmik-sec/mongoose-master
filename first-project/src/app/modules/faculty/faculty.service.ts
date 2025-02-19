import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Faculty } from './faculty.model';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment academicFaculty'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  const meta = await facultyQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getSingleFacultyFromDb = async (id: string) => {
  // const result = await Faculty.findOne({ id });
  const result = await Faculty.findById(id);

  return result;
};
const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSingleFacultyFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedFaculty) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete Faculty');
    }
    const user = deletedFaculty.user;
    const deleteUser = await User.findByIdAndUpdate(
      user,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, (err as Error)?.message);
  }
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDb,
  updateFacultyIntoDB,
  deleteSingleFacultyFromDb,
};
