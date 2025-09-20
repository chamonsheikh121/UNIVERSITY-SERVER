import express from 'express';
import { student_router } from '../modules/student/student.router';
import { user_router } from '../modules/user/user.router';
import { academic_semester_router } from '../modules/academic_Semester/academic_semester.router';
import { academic_faculty_router } from '../modules/academic_faculty/academic_faculty.router';
import { academic_department_router } from '../modules/academic_department/academic_department.router';
import { faculty_routers } from '../modules/faculty/faculty.router';
import { admin_routers } from '../modules/admin/admin.router';
import { course_routers } from '../modules/courses/course.router';
import { semester_registration_router } from '../modules/semester_registration/semester_registration.router';
import { offered_course_router } from '../modules/offered_course/offered_course.router';
import { auth_router } from '../modules/auth/auth.router';

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
  {
    path: '/academic-faculties',
    route: academic_faculty_router,
  },
  {
    path: '/academic-departments',
    route: academic_department_router,
  },
  {
    path: '/faculties',
    route: faculty_routers,
  },
  {
    path: '/admins',
    route: admin_routers,
  },
  {
    path: '/courses',
    route: course_routers,
  },
  {
    path: '/semester-registrations',
    route: semester_registration_router,
  },
  {
    path: '/offered-courses',
    route: offered_course_router,
  },
  {
    path: '/auth',
    route: auth_router,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
