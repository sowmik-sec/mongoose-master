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

const getTotalPriceForUser = async (id: string) => {
  console.log(id);
  const result = await Order.aggregate([
    {
      $match: { user: new mongoose.Types.ObjectId(id) },
    },
    {
      $group: {
        _id: "$user",
        totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
      },
    },
  ]);
  return result[0].totalPrice;
};

export const OrderService = {
  createOrderIntoDb,
  getAllOrdersFromDb,
  getTotalPriceForUser,
};
