import { CategoryRoutes } from "../modules/category/category.route";
import { CourseRoutes } from "../modules/course/course.route";
import express from "express";
import { ReviewRoutes } from "../modules/review/review.route";
import { UserRoutes } from "../modules/user/user.route";
const router = express.Router();
const moduleRoutes = [
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
