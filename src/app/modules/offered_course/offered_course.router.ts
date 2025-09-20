import { Router } from 'express';
import validate_request from '../../Middle_wares/validateRequest';
import offered_course_zod_validation from './offered_course_zod_validation';
import { offered_course_controller } from './offered_course.controller';

const router = Router();

router.post(
  '/create-offered_course',
  validate_request(
    offered_course_zod_validation.create_offered_course_zod_validation_schema,
  ),
  offered_course_controller.create_offered_course,
);
// router.get('/', offered_course_controller.);
// router.get('/:id', );
// router.delete('/:id',);

export const offered_course_router = router;
