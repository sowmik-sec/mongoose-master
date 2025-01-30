import express from "express";
import userValidationSchema from "./user.validation";
import { UserController } from "./user.controller";
const router = express.Router();

router.post("/create-user", UserController.createUser);
router.get("/", UserController.getAllUsers);

export const UserRoutes = router;
