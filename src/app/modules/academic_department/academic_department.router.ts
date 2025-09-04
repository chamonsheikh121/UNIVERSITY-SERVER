import express from 'express';
import { academic_department_controller } from './academic_department.controller';

import validate_request from '../../Middle_wares/validateRequest';
import academic_department_zod_validation from './academic_department_zod-validation';



const router = express.Router();

router.get('/', academic_department_controller.get_all_academic_department);
router.get('/:id', academic_department_controller.get_single_academic_department);
router.patch('/:id', validate_request(academic_department_zod_validation.update_academic_department_zod_validation_schema), academic_department_controller.update_academic_department);

router.post(
  '/create-academic-department',
  validate_request(academic_department_zod_validation.create_academic_department_zod_validation_schema),
  academic_department_controller.create_academic_department,
);

export const academic_department_router = router;
