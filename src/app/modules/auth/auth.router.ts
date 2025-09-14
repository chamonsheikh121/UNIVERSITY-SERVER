import express from 'express';
import { auth_controllers } from './auth.controller';
import validate_request from '../../Middle_wares/validateRequest';
import { auth_zod_validation_schema } from './auth_zod_validation';

const router = express.Router();
router.post(
  '/login',
  validate_request(auth_zod_validation_schema),
  auth_controllers.login_user,
);

export const auth_router = router;
