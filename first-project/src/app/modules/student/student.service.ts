import { TStudent } from './student.interface';
import { Student } from './student.modal';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student);
  const student = new Student(studentData);
  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }
  const result = await student.save();
  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
};
