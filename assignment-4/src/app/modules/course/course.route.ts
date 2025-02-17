import express from "express";
import validateRequest from "../../utils/validateRequest";
import { CourseValidation } from "./course.validation";
import { CourseController } from "./course.contrller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-course",
  auth("admin"),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse
);
router.put(
  "/:id",
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse
);
router.get("/:courseId/reviews", CourseController.getCourseWithReview);
router.get("/best", CourseController.getBestCourse);

router.get("/", CourseController.getCourses);

export const CourseRoutes = router;
