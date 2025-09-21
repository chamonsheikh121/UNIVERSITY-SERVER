import express from 'express'
import { enrolled_course_controller } from './enrolled_course_controller'
const router =  express.Router()


router.post('/create-enrolled-course', enrolled_course_controller.create_enrolled_course);

export const enroll_course_router = router