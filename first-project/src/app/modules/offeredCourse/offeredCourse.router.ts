import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controller';

const router = express.Router();
router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);
router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);

router.get('/', OfferedCourseControllers.getAllOfferedCourse);

export const offeredCourseRoutes = router;
