import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { OrderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const zodParsedData = orderValidationSchema.parse(order);
    const result = await OrderService.createOrderIntoDb(zodParsedData);
    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "something went wrong",
      error: error,
    });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await OrderService.getAllOrdersFromDb(id);
    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "something went wrong",
      error: error,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
