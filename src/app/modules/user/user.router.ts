import express from 'express';
import { user_controllers } from './user.controller';
import { create_student_zod_validation_schema } from '../student/student.zod_validation';
import validate_request from '../../Middle_wares/validateRequest';
import { create_faculty_zod_validation_schema } from '../faculty/faculty_zod_validation';

const router = express.Router();

router.post(
  '/create-student',
  validate_request(create_student_zod_validation_schema),
  user_controllers.createStudent,
);
router.post(
  '/create-faculty',
  validate_request(create_faculty_zod_validation_schema),
  user_controllers.create_faculty,
);

export const user_router = router;
