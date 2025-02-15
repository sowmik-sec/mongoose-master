import { Types } from "mongoose";

export type TPasswordHistory = {
  password: string;
  createdAt: Date;
};

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  passwordHistory: TPasswordHistory[];
};
