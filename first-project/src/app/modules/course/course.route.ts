import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// it will call controller func
router.post(
  '/create-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.getSingleCourse,
);
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CourseControllers.deleteCourse,
);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesWithCourse,
);
router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.getAllCourse,
);
export const CourseRoutes = router;
