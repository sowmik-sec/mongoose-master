import { Types } from "mongoose";

type TTag = {
  name: string;
  isDeleted: boolean;
};

type TDetails = {
  level: "beginner" | "intermediate" | "advanced";
  description: string;
};

export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: [TTag];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: TDetails;
};
