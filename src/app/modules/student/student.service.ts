import { TStudent } from './student.interface';
import StudentModel from './student.model';

const createStudentToDB = async (student_data: TStudent) => {
  if (await StudentModel.is_user_email_exist(student_data.email)) {
    throw new Error('User already exist from statics ! ');
  }

  const result = await StudentModel.create(student_data);
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

const deleteStudentFromDB = async (id: string) => {
  console.log(id);
  const result = await StudentModel.updateOne(
    { id },
    { $set: { isDeleted: true } },
  );
  return result;
};

export const studentServices = {
  createStudentToDB,
  getAllStudentsFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
};
