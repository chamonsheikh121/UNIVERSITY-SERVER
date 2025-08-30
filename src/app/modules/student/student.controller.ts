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

export const studentsControllers = {
  createStudent,
};
