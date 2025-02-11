import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.modal';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { StatusCodes } from 'http-status-codes';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { Faculty } from '../faculty/faculty.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if password is not given, use default password

  userData.password = password || (config.default_pass as string);
  userData.role = 'student';
  userData.email = payload.email;
  // create a userData

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new AppError(404, 'Student not found');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);
    sendImageToCloudinary();
    const newUser = await User.create([userData], { session });
    // create a student
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
      // set id, _id as userData
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // transaction 2
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, (err as Error)?.message);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = 'admin';
  // set admin email
  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateAdminId();
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create admin');
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, (err as Error)?.message);
  }
};
const createFacultyIntoDB = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = 'faculty';
  // set faculty email
  userData.email = payload.email;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateFacultyId();
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create faculty');
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, (err as Error)?.message);
  }
};

const getMe = async (userId: string, role: string) => {
  console.log(userId, role);
  let result = null;
  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }
  if (role === 'faculty') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }

  // const result = await
  return result;
};

const changeStatusIntoDB = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createAdminIntoDB,
  createFacultyIntoDB,
  getMe,
  changeStatusIntoDB,
};
