/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourse from './enrolledCourse.model';
import { Student } from '../student/student.modal';
import mongoose from 'mongoose';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /**
   * step1: check if the offered course is exists
   * step2: check if the student is already enrolled
   * step3: create an enrolled course
   */
  const { offeredCourse } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Offered course does not exist');
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Room is full');
  }
  const student = await Student.findOne({ id: userId }).select('_id id');
  if (!student) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student not found');
  }
  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });
  if (isStudentAlreadyEnrolled) {
    throw new AppError(StatusCodes.CONFLICT, 'Student already enrolled');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          student: student._id,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );
    if (!result) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to enroll in this course',
      );
    }
    const maxCapacity = isOfferedCourseExists.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(
      offeredCourse,
      { maxCapacity: maxCapacity - 1 },
      { new: true, session },
    );
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const EnrolledCourseService = {
  createEnrolledCourseIntoDB,
};
