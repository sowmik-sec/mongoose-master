import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TAuth } from "./auth.interface";
import bcrypt from "bcrypt";
import { TUser } from "../user/user.interface";
import createToken from "../../utils/createToken";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";

const login = async (payload: TAuth) => {
  const user = await User.findOne({
    username: payload.username,
  }).select("+password");
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Wrong Password");
  }

  let userData: Partial<TUser> = {};
  userData.username = user.username;
  userData.email = user.email;
  const accessToken = createToken(
    userData,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    user,
    token: accessToken,
  };
};

const changePasswordIntoDB = async (
  token: string,
  payload: { currentPassword: string; newPassword: string }
) => {
  const isVerifiedToken = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;
  const isUserExists = await User.findOne({
    username: isVerifiedToken?.username,
  }).select("+password");
  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }
  const isPasswordMatched = await bcrypt.compare(
    payload.currentPassword,
    isUserExists?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Wrong Password");
  }
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round)
  );

  const result = await User.findByIdAndUpdate(
    isUserExists._id,
    { password: hashedPassword },
    { new: true, runValidators: true }
  );
  return result;
};

export const AuthService = {
  login,
  changePasswordIntoDB,
};
