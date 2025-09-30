import express from 'express';
import { academic_semester_controller } from './academic_semester.controller';
import validate_request from '../../Middle_wares/validateRequest';
import { academic_semester_zod_validation_schema } from './academic_semester_zod_validation';
import authorizer from '../../Middle_wares/authorization';
import { user_roles } from '../user/user.constance';

const router = express.Router();

router.get('/', authorizer(user_roles.admin), academic_semester_controller.get_all_academic_semesters);
router.get('/:id', academic_semester_controller.get_single_academic_semester);
router.patch('/:id', academic_semester_controller.update_academic_semester);

router.post(
  '/create-semester',
  validate_request(academic_semester_zod_validation_schema),
  academic_semester_controller.create_academic_semester,
);

export const academic_semester_router = router;
