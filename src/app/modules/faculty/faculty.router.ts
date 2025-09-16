import express from 'express';
import validate_request from '../../Middle_wares/validateRequest';
import { update_faculty_zod_validation_schema } from './faculty_zod_validation';
import { faculty_controllers } from './faculty.controller';
import authorizer from '../../Middle_wares/authorization';
import { user_roles } from '../user/user.constance';

const router = express.Router();

router.get(
  '/',
  authorizer(user_roles.admin),
  faculty_controllers.get_faculties,
);
router.get(
  '/:_id',
  authorizer(user_roles.admin),
  faculty_controllers.get_single_faculty,
);
router.delete(
  '/:_id',
  authorizer(user_roles.admin),
  faculty_controllers.delete_faculty,
);
router.patch(
  '/:_id',
  authorizer(user_roles.admin),
  validate_request(update_faculty_zod_validation_schema),
  faculty_controllers.update_faculty,
);

export const faculty_routers = router;
