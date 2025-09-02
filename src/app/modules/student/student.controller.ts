import { Request, Response } from 'express';
import { studentServices } from './student.service';

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

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await studentServices.deleteStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: 'student deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Student deleting failed',
      error: error.message || error,
    });
  }
};

export const studentsControllers = {
  getStudents,
  getStudent,
  deleteStudent,
};
