import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  // semester name --> semester code

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDb = async (): Promise<TAcademicSemester[]> => {
  const result = await AcademicSemester.find();
  return result;
};
const getSingleAcademicSemesterFromDb = async (
  id: string,
): Promise<TAcademicSemester | null> => {
  const result = await AcademicSemester.findOne({ _id: id });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemesterFromDb,
  getSingleAcademicSemesterFromDb,
};
