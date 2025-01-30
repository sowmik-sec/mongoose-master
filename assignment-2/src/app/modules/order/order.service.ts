import mongoose, { Types } from "mongoose";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDb = async (payload: TOrder): Promise<TOrder> => {
  const result = await Order.create(payload);
  return result;
};

const getAllOrdersFromDb = async (id: string) => {
  const result = await Order.find({ user: id })
    .populate("user", "username email") // Populate user with specific fields
    .exec();

  return result;
};

export const OrderService = {
  createOrderIntoDb,
  getAllOrdersFromDb,
};
