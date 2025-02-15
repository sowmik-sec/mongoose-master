import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser): Promise<TUser> => {
  const isUserNameExists = await User.findOne({ username: payload.username });
  if (isUserNameExists) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Username is already exist");
  }
  const isEmailExists = await User.findOne({ email: payload.email });
  if (isEmailExists) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email is already exist");
  }
  const result = await User.create(payload);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
