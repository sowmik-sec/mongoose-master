import express from "express";
import { OrderController } from "./order.controller";
const router = express.Router();

router.post("/create-order", OrderController.createOrder);
router.get("/:id", OrderController.getAllOrders);
router.get("/user-order/:id", OrderController.getTotalPriceForUser);

export const OrderRoutes = router;
