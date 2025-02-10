import { TLoginUser } from './auth.interface';

const loginUser = (payload: TLoginUser) => {
  console.log(payload);
  return {};
};

export const AuthServices = {
  loginUser,
};
