import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { EnrolledCourseValidations } from './enrolledCourse.validation';
import { EnrolledCourseController } from './enrolledCourse.controller';

const router = express.Router();

// it will call controller func
router.post(
  '/create-course',
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseController.createEnrolledCourse,
);

export const EnrolledCourseRoutes = router;
