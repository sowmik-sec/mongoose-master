import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { EnrolledCourseValidations } from './enrolledCourse.validation';
import { EnrolledCourseController } from './enrolledCourse.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// it will call controller func
router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseController.createEnrolledCourse,
);
router.patch(
  '/update-enrolled-course-marks',
  auth(USER_ROLE.faculty, USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseController.updateEnrolledCourseMarks,
);

router.get(
  '/my-enrolled-courses',
  auth(USER_ROLE.student),
  EnrolledCourseController.getMyEnrolledCourses,
);

export const EnrolledCourseRoutes = router;
