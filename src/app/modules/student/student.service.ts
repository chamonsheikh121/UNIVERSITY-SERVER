import { Student } from './student.interface';
import StudentModel from './student.model';

const createStudentToDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};
const getStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentToDB,
  getAllStudentsFromDB,
  getStudentFromDB,
};
