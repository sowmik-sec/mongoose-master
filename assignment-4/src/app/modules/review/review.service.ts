import { JwtPayload } from "jsonwebtoken";
import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReviewIntoDB = async (user: JwtPayload, payload: TReview) => {
  payload.createdBy = user._id;
  const result = await Review.create(payload);
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
};
