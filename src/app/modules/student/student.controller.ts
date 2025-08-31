import { Request, Response } from 'express';
import { studentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    console.log(student);
    const result = await studentServices.createStudentToDB(student);
    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'students retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await studentServices.getStudentFromDB(id);
    res.status(200).json({
      success: true,
      message: 'student retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentsControllers = {
  createStudent,
  getStudents,
  getStudent,
};
