import { Types } from "mongoose";
import { TUser } from "../user/user.interface";

export type TOrder = {
  user: Types.ObjectId | TUser;
  productName: string;
  price: number;
  quantity: number;
};
