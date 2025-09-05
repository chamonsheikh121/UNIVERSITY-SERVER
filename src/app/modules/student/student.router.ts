import express from 'express';
import { studentsControllers } from './student.controller';
import validate_request from '../../Middle_wares/validateRequest';
import { update_student_zod_validation_schema } from './student.zod_validation';

const router = express.Router();

router.get('/', studentsControllers.getStudents);
router.get('/:id', studentsControllers.get_single_student);
router.delete('/:studentId', studentsControllers.deleteStudent);
router.patch(
  '/:student_id',
  validate_request(update_student_zod_validation_schema),
  studentsControllers.update_student,
);

export const student_router = router;
