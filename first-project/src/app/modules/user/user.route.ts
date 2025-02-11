import express from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../utils/validateRequest';
import { AdminValidation } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { FacultyValidation } from '../faculty/faculty.validation';
import { UserValidation } from './user.validation';

const router = express.Router();

// it will call controller func
router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(FacultyValidation.createFacultyValidationSchema),
  UserControllers.createFaculty,
);
router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminValidationSchema),
  UserControllers.createAdmin,
);
router.get('/me', auth('admin', 'faculty', 'student'), UserControllers.getMe);

export const UserRoutes = router;
