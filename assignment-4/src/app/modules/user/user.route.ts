import express from "express";
import { UserValidations } from "./user.validation";
import validateRequest from "../../utils/validateRequest";
import { UserController } from "./user.controller";
const router = express.Router();

router.post(
  "/create-user",
  validateRequest(UserValidations.createUserZodSchema),
  UserController.createUser
);

export const UserRoutes = router;
