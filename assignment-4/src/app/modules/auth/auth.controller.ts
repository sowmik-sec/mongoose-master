import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../config";

const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);
  const { refreshToken, accessToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User Logged in Successfully",
    data: {
      accessToken,
    },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const result = await AuthService.changePasswordIntoDB(req.user, req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Password changed successfully Successfully",
    data: result,
  });
});

export const AuthController = {
  login,
  changePassword,
};
