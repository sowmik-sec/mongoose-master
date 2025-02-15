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
  let isVerifiedToken: JwtPayload;
  try {
    isVerifiedToken = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
  } catch (error) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid or expired token");
  }

  const user = await User.findOne({
    username: isVerifiedToken?.username,
  }).select("+password");

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  // Verify current password
  const isPasswordMatched = await bcrypt.compare(
    payload.currentPassword,
    user.password
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Wrong Password");
  }

  // Check if new password matches current password
  const isNewSameAsCurrent = await bcrypt.compare(
    payload.newPassword,
    user.password
  );
  if (isNewSameAsCurrent) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "New password cannot be the same as current password"
    );
  }

  // Check against historical passwords AND current password
  const allRelevantPasswords = [
    user.password,
    ...user.passwordHistory.map((p) => p.password),
  ];
  const isPasswordUsed = await Promise.all(
    allRelevantPasswords.map(async (hash) =>
      bcrypt.compare(payload.newPassword, hash)
    )
  );
  if (isPasswordUsed.some((match) => match)) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Password must differ from current and last 2 used"
    );
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round)
  );

  // Add current password to history before updating
  user.passwordHistory.push({
    password: user.password,
    createdAt: new Date(),
  });

  // Keep only last 2 passwords
  if (user.passwordHistory.length > 2) {
    user.passwordHistory.shift();
  }

  // Update password
  user.password = payload.newPassword;
  await user.save();

  return user;
};

export const AuthService = {
  login,
  changePasswordIntoDB,
};
