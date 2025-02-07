import { model, Schema } from "mongoose";
import { TCourse } from "./course.interface";

const detailsSchema = new Schema({
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
  },
  description: {
    type: String,
  },
});

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: [
      {
        name: {
          type: String,
        },
        isDeleted: {
          type: Boolean,
        },
      },
    ],
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    durationInWeeks: {
      type: Number,
      required: true,
    },
    details: detailsSchema,
  },
  {
    timestamps: true,
  }
);

export const Course = model<TCourse>("Course", courseSchema);
