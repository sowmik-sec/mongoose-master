import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User Logged in Successfully",
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const result = await AuthService.changePasswordIntoDB(
    req.headers.authorization as string,
    req.body
  );
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
