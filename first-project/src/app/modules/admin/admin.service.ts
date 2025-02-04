import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Admin } from './admin.model';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';

const getAllAdminsFromDb = async (query: Record<string, unknown>) => {
  const AdminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await AdminQuery.modelQuery;
  return result;
};

const getSingleAdminFromDb = async (id: string) => {
  // const result = await Admin.findOne({ id });
  const result = await Admin.findOne({ id });

  return result;
};
const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;
  /**
   * guardian: {
       fatherOccupation: occupation
    }
    guardian.fatherOccupation = occupation
   */

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSingleAdminFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedAdmin = await Admin.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedAdmin) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete Admin');
    }
    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, (err as Error)?.message);
  }
};

export const AdminServices = {
  getAllAdminsFromDb,
  getSingleAdminFromDb,
  updateAdminIntoDB,
  deleteSingleAdminFromDb,
};
