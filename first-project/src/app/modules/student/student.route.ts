import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../utils/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middlewares/auth';
const router = express.Router();

// it will call controller func
router.get(
  '/:id',
  auth('superAdmin', 'admin', 'faculty'),
  StudentControllers.getSingleStudent,
);
router.patch(
  '/:id',
  auth('superAdmin', 'admin', 'faculty'),
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
router.get(
  '/',
  auth('superAdmin', 'admin', 'faculty'),
  StudentControllers.getAllStudents,
);
router.delete(
  '/:id',
  auth('superAdmin', 'admin', 'faculty'),
  StudentControllers.deleteSingleStudent,
);

export const StudentRoutes = router;
