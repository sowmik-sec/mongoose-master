import { CourseRoutes } from "../modules/course/course.route";
import express from "express";
const router = express.Router();
const moduleRoutes = [
  {
    path: "/courses",
    route: CourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
