import express from 'express';
import { student_router } from '../modules/student/student.router';
import { user_router } from '../modules/user/user.router';

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
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
