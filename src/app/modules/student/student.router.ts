import express from 'express';
import { studentsControllers } from './student.controller';

const router = express.Router();

router.post('/create-student', studentsControllers.createStudent);

export const StudentRouter = router;
