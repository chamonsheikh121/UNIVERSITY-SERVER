import express from 'express';

import validate_request from '../../Middle_wares/validateRequest';
import { admin_controller } from './admin.controller';
import { update_admin_zod_validation_schema } from './admin_zod_validation';

const router = express.Router();

router.get('/', admin_controller.get_admins);
router.get('/:_id', admin_controller.get_single_admin);
router.delete('/:_id', admin_controller.delete_admin);
router.patch(
  '/:_id',
  validate_request(update_admin_zod_validation_schema),
  admin_controller.update_admin,
);

export const admin_routers = router;
