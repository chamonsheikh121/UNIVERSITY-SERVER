import express from 'express';
import { user_controllers } from './user.controller';
import { create_student_zod_validation_schema } from '../student/student.zod_validation';
import validate_request from '../../Middle_wares/validateRequest';
import { create_faculty_zod_validation_schema } from '../faculty/faculty_zod_validation';
import { create_admin_zod_validation_schema } from '../admin/admin_zod_validation';
import authorizer from '../../Middle_wares/authorization';
import { user_roles } from './user.constance';

const router = express.Router();

router.post(
  '/create-student',
  authorizer(user_roles.admin),
  validate_request(create_student_zod_validation_schema),
  user_controllers.create_student,
);
router.post(
  '/create-faculty',
  authorizer(user_roles.admin),
  validate_request(create_faculty_zod_validation_schema),
  user_controllers.create_faculty,
);
router.post(
  '/create-admin',

  validate_request(create_admin_zod_validation_schema),
  user_controllers.create_admin,
);

export const user_router = router;
