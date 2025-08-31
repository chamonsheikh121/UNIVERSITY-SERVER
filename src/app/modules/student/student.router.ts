import express from 'express';
import { studentsControllers } from './student.controller';

const router = express.Router();

router.post('/create-student', studentsControllers.createStudent);
router.get('/', studentsControllers.getStudents);
router.get('/:id', studentsControllers.getStudent);

export const StudentRouter = router;
