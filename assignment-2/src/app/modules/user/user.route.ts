import express from "express";
import userValidationSchema from "./user.validation";
import { UserController } from "./user.controller";
const router = express.Router();

router.post("/create-user", UserController.createUser);

export const UserRoutes = router;
