import StudentModel from './student.model';

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
  getAllStudentsFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
};
