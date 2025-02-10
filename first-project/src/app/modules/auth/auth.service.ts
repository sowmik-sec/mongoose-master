import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
const loginUser = async (payload: TLoginUser) => {
  // check if the user exists
  const isUserExists = await User.isUserExistsByCustomId(payload.id);
  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  // check if the user is already deleted
  // const isDeleted = isUserExists?.isDeleted;
  // if (isDeleted) {
  //   throw new AppError(StatusCodes.FORBIDDEN, 'User is deleted');
  // }
  // // check if the user is blocked
  // const userStatus = isUserExists?.status;
  // if (userStatus === 'blocked') {
  //   throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
  // }

  // checking if the password is correct
  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    isUserExists.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');
  }
  // Access Granted: Send accessToken, RefreshToken
  return {};
};

export const AuthServices = {
  loginUser,
};
