import { Student } from './student.interface';
import StudentModel from './student.model';

const createStudentToDB = async (student: Student) => {
  try {
    const result = await StudentModel.create(student);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};
const getStudentFromDB = async (id: string) => {
  try {
    const result = await StudentModel.findOne({ id });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const studentServices = {
  createStudentToDB,
  getAllStudentsFromDB,
  getStudentFromDB,
};
