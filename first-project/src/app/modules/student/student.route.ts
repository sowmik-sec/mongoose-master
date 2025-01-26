import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// it will call controller func
router.post('/create-student', StudentControllers.createStudent);

export const StudentRoutes = router;
