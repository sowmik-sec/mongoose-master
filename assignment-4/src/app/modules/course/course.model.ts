import { model, Schema } from "mongoose";
import { TCourse } from "./course.interface";

const detailsSchema = new Schema({
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
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
          required: true,
        },
        isDeleted: {
          type: Boolean,
          required: true,
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
    },
    details: detailsSchema,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.pre("save", function (next) {
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);
  const diffInMs = end.getTime() - start.getTime();
  const diffInWeeks = Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 7));
  this.durationInWeeks = diffInWeeks;
  next();
});

export const Course = model<TCourse>("Course", courseSchema);
