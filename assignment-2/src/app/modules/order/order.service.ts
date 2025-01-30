import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDb = async (payload: TOrder): Promise<TOrder> => {
  const result = await Order.create(payload);
  return result;
};

export const OrderService = {
  createOrderIntoDb,
};
