import { Response } from "express";
type TResponse<T, X> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: X;
  data: T;
};

const sendResponse = <T, X>(res: Response, data: TResponse<T, X>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data?.meta,
    data: data?.data,
  });
};

export default sendResponse;
