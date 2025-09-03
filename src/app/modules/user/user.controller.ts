import { NextFunction, Request, Response } from 'express';

import { user_services } from './user.service';
import { send_response } from '../../Middle_wares/send_response';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, studentData } = req.body;

    // const { error, value } = student_validation_schema.validate(studentData);
    // if (error) {
    //   res.status(400).json({
    //     success: false,
    //     message: 'Please provide valid data',
    //     error: error.details,
    //   });
    // }

    const result = await user_services.create_student_to_db(
      password,
      studentData,
    );

    send_response(res, {
      message: 'student created successfully',
      data: result,
    });
  } catch (error) {
    next(error);

    // res.status(400).json({
    //   success: false,
    //   message: error.message || 'Bad request from server',
    //   error: error,
    // });
  }
};

console.log('Exporting createStudent =>', createStudent);

export const user_controllers = {
  createStudent,
};
