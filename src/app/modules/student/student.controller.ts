import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';
import { send_response } from '../../Middle_wares/send_response';

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    send_response(res, {
      message: 'students retrieved successfully',
      data: result,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await studentServices.getStudentFromDB(id);
    send_response(res, {
      message: 'student retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await studentServices.deleteStudentFromDB(id);
    send_response(res, {
      message: 'student deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const studentsControllers = {
  getStudents,
  getStudent,
  deleteStudent,
};
