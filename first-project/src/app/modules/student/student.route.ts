import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../utils/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

// it will call controller func
router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
router.delete('/:id', StudentControllers.deleteSingleStudent);

export const StudentRoutes = router;
