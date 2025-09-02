import express from 'express';
import { user_controllers } from './user.controller';

const router = express.Router();

router.post('/create-user', user_controllers.createStudent);

export const user_router = router;
