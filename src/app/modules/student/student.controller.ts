import { Request, Response } from 'express';
import { studentServices } from './student.service';
import student_validation_schema from './student.joi_Validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { studentData } = req.body;
    const { error } = student_validation_schema.validate(studentData);
    if (error) {
      res.status(400).json({
        success: false,
        message: 'Please provide valid data',
        error: error.details,
      });
    }

    console.log(studentData);
    const result = await studentServices.createStudentToDB(studentData);
    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Bad request from server',
      error: error.message || error,
    });
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
