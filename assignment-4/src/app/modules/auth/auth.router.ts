import express from "express";
import validateRequest from "../../utils/validateRequest";
import { AuthValidations } from "./auth.validation";
import { AuthController } from "./auth.controller";
const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidations.loginUserZodSchema),
  AuthController.login
);
router.post(
  "/change-password",
  validateRequest(AuthValidations.changePasswordZodSchema),
  AuthController.changePassword
);

export const AuthRoutes = router;
