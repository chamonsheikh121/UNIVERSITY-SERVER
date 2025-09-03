import express from 'express';
import { user_controllers } from './user.controller';
import { create_student_zod_validation_schema } from '../student/student.zod_validation';
import validate_request from '../../Middle_wares/validateRequest';

const router = express.Router();

router.post(
  '/create-user',
  validate_request(create_student_zod_validation_schema),
  user_controllers.createStudent,
);

export const user_router = router;
