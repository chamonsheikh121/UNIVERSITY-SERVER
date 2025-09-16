import express from 'express';
import { auth_controllers } from './auth.controller';
import validate_request from '../../Middle_wares/validateRequest';
import {
  auth_change_pass_zod_validation_schema,
  auth_login_zod_validation_schema,
  refresh_token_zod_validation_schema,
} from './auth_zod_validation';
import authorizer from '../../Middle_wares/authorization';
import { user_roles } from '../user/user.constance';

const router = express.Router();

router.post(
  '/login',
  validate_request(auth_login_zod_validation_schema),
  auth_controllers.login_user,
);
router.post(
  '/change-password',
  authorizer(user_roles.admin, user_roles.faculty, user_roles.student),
  validate_request(auth_change_pass_zod_validation_schema),
  auth_controllers.change_password,
);
router.post(
  '/refresh-token',
  validate_request(refresh_token_zod_validation_schema),
  auth_controllers.refresh_token,
);

export const auth_router = router;
