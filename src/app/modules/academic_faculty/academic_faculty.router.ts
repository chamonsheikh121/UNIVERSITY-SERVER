import express from 'express';
import { academic_faculty_controller } from './academic_faculty.controller';
import validate_request from '../../Middle_wares/validateRequest';
import academic_faculty_zod_valivation_schema from './academic_faculty_zod_validation';


const router = express.Router();

router.get('/', academic_faculty_controller.get_all_academic_faculties);
router.get('/:id', academic_faculty_controller.get_single_academic_faculty);
router.patch('/:id', academic_faculty_controller.update_academic_faculty);

router.post(
  '/create-academic-faculty',
  validate_request(academic_faculty_zod_valivation_schema),
  academic_faculty_controller.create_academic_faculty,
);

export const academic_faculty_router = router;
