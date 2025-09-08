import express from 'express';
import { faculty_contollers } from './faculty.controller';
import validate_request from '../../Middle_wares/validateRequest';
import { update_faculty_zod_validation_schema } from './faculty_zod_validation';

const router = express.Router();

router.get('/', faculty_contollers.get_faculties);
router.get('/:facultyId', faculty_contollers.get_single_faculty);
router.delete('/:facultyId', faculty_contollers.delete_faculty);
router.patch(
  '/:facultyId',
  validate_request(update_faculty_zod_validation_schema),
  faculty_contollers.update_faculty,
);

export const faculty_routers = router;
