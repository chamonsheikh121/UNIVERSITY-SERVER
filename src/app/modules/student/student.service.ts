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

export const studentServices = {
    createStudentToDB
};
