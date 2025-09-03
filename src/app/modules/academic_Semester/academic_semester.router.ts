
import express from 'express';
import { academic_semester_controller } from './academic_semester.controller';
import validate_request from '../../Middle_wares/validateRequest';
import { academic_semester_zod_validation_schema } from './academic_semester_zod_validation';

const router = express.Router();

router.post('/create-semester', validate_request(academic_semester_zod_validation_schema) , academic_semester_controller.create_academic_semester)

export const academic_semester_router = router;