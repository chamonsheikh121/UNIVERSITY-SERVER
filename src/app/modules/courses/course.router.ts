import express from 'express';

import { course_contollers } from './course.controller';
import {
  faculty_and_couse_into_db_zod_validation_schema,
  update_course_zod_validation_schema,
} from './course_zod_validation';
import validate_request from '../../Middle_wares/validateRequest';

const router = express.Router();
router.post('/create-course', course_contollers.create_course);

router.get('/', course_contollers.get_courses);
router.get('/:_id', course_contollers.get_single_course);
router.delete('/:_id', course_contollers.delete_course);
router.patch(
  '/:_id',
  validate_request(update_course_zod_validation_schema),
  course_contollers.update_course,
);

router.put(
  '/:_id/assign-faculties',
  validate_request(faculty_and_couse_into_db_zod_validation_schema),
  course_contollers.assign_course_faculties,
);
router.delete(
  '/:_id/remove-faculties',
  validate_request(faculty_and_couse_into_db_zod_validation_schema),
  course_contollers.remove_course_faculties,
);

export const course_routers = router;
