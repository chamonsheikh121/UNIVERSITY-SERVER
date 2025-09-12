import express from 'express';
import { semester_regiestration_controller } from './semester_registration.controller';
import validate_request from '../../Middle_wares/validateRequest';
import { create_semester_registration_validation_schema } from './semester_registration.zod_validation';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validate_request(create_semester_registration_validation_schema),
  semester_regiestration_controller.create_semester_registration,
);
router.get('/', semester_regiestration_controller.get_all_registered_semesters);
router.get(
  '/:_id',
  semester_regiestration_controller.get_single_registered_semester,
);
router.patch(
  '/:_id',
  semester_regiestration_controller.update_registered_semester,
);

export const semester_registration_router = router;
