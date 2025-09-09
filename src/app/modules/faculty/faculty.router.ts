import express from 'express';
import validate_request from '../../Middle_wares/validateRequest';
import { update_faculty_zod_validation_schema } from './faculty_zod_validation';
import { faculty_controllers } from './faculty.controller';

const router = express.Router();

router.get('/', faculty_controllers.get_faculties);
router.get('/:_id', faculty_controllers.get_single_faculty);
router.delete('/:_id', faculty_controllers.delete_faculty);
router.patch(
  '/:_id',
  validate_request(update_faculty_zod_validation_schema),
  faculty_controllers.update_faculty,
);

export const faculty_routers = router;
