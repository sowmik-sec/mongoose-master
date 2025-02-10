import express from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../utils/validateRequest';
import { AdminValidation } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

// it will call controller func
router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  validateRequest(AdminValidation.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
