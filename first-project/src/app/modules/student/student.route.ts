import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// it will call controller func
router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.delete('/:studentId', StudentControllers.deleteSingleStudent);

export const StudentRoutes = router;
