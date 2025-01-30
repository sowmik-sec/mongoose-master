import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (user: TUser): Promise<TUser> => {
  const isExists = await User.isUserExists(user.id);
  if (isExists) {
    throw new Error("User already exist");
  }
  const result = await User.create(user);
  return result;
};

const getAllUsersFromDb = async (): Promise<TUser[]> => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDb = async (id: string): Promise<TUser | null> => {
  const result = await User.findOne({ id });
  return result;
};

const deleteUserFromDb = async (id: string) => {
  const result = await User.deleteOne({ id });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDb,
  getSingleUserFromDb,
  deleteUserFromDb,
};
