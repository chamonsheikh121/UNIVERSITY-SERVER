import express from 'express';
import { studentsControllers } from './student.controller';

const router = express.Router();

router.get('/', studentsControllers.getStudents);
router.get('/:id', studentsControllers.getStudent);
router.delete('/:id', studentsControllers.deleteStudent);

export const student_router = router;
