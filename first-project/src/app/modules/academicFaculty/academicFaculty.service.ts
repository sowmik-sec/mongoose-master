import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (
  payload: TAcademicFaculty,
): Promise<TAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultyFromDb = async (): Promise<TAcademicFaculty[]> => {
  const result = await AcademicFaculty.find();
  return result;
};
const getSingleAcademicFacultyFromDb = async (
  id: string,
): Promise<TAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOne({ _id: id });
  return result;
};
const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDb,
  getSingleAcademicFacultyFromDb,
  updateAcademicFacultyIntoDB,
};
