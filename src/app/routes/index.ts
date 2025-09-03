import express from 'express';
import { student_router } from '../modules/student/student.router';
import { user_router } from '../modules/user/user.router';
import { academic_semester_router } from '../modules/academic_Semester/academic_semester.router';

const router = express.Router();

const routes = [
  {
    path: '/students',
    route: student_router,
  },
  {
    path: '/users',
    route: user_router,
  },
  {
    path: '/academic-semesters',
    route: academic_semester_router,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
