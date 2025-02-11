import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../utils/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

// it will call controller func
router.get(
  '/:id',
  auth('admin', 'faculty'),
  StudentControllers.getSingleStudent,
);
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
router.get('/', auth(USER_ROLE.admin), StudentControllers.getAllStudents);
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  StudentControllers.deleteSingleStudent,
);

export const StudentRoutes = router;
