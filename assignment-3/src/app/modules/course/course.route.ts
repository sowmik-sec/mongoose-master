import express from "express";
import validateRequest from "../../utils/validateRequest";
import { CourseValidation } from "./course.validation";
import { CourseController } from "./course.contrller";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse
);
router.put(
  "/:id",
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse
);
router.get("/:courseId/reviews", CourseController.getCourseWithReview);

router.get("/", CourseController.getCourses);

export const CourseRoutes = router;
