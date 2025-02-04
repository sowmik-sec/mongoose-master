import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

// it will call controller func
router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/:id', CourseControllers.getSingleCourse);
router.delete('/:id', CourseControllers.deleteCourse);
// router.put(
//   '/:id',
//   validateRequest(
//     CourseValidation.createCourseValidationSchema,
//   ),
//   CourseControllers.,
// );
router.get('/', CourseControllers.getAllCourse);
export const CourseRoutes = router;
