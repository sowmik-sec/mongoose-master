import { model, Schema } from "mongoose";
import { TPasswordHistory, TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const passwordHistorySchema = new Schema<TPasswordHistory>({
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new Schema<TUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: 0,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  passwordHistory: {
    type: [passwordHistorySchema],
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  // only hash the password if it's modified
  if (!this.isModified("password")) {
    return next();
  }
  // Hash the password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );

  next();
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.passwordHistory;
    return ret;
  },
});

export const User = model<TUser>("User", userSchema);
