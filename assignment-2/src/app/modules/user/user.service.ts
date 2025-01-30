import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (user: TUser) => {
  const isExists = await User.isUserExists(user.id);
  if(isExists) {
    throw new Error('User already exist')
  }
  const result = await User.create(user);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
