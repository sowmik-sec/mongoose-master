import { Model, Types } from "mongoose";

export type TPasswordHistory = {
  password: string;
  createdAt: Date;
};

export type TUser = {
  username: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: "user" | "admin";
  passwordHistory: TPasswordHistory[];
};

export interface UserModel extends Model<TUser> {
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
