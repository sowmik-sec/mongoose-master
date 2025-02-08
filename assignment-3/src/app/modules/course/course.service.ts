import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { courseSearchableFields } from "./course.constant";
import { Course } from "./course.model";
import { TCourse } from "./course.interface";
import mongoose from "mongoose";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getCoursesFromDB = async (payload: Record<string, unknown>) => {
  console.log(payload);
  const {
    searchTerm,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "asc",
    minPrice,
    maxPrice,
    tag,
    level,
  } = payload;
  const matchStage: any = {};
  if (searchTerm) {
    matchStage.$or = courseSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    }));
  }
  if (minPrice || maxPrice) {
    matchStage.price = {};
    if (minPrice) {
      matchStage.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      matchStage.price.$lte = Number(maxPrice);
    }
  }
  if (tag) {
    matchStage.tags = {
      $elemMatch: {
        name: { $regex: tag, $options: "i" },
        isDeleted: false,
      },
    };
  }
  if (level) {
    matchStage["details.level"] = level;
  }
  console.log(JSON.stringify(matchStage));

  const result = await Course.aggregate([
    { $match: matchStage },
    { $sort: { [sortBy as string]: sortOrder === "asc" ? 1 : -1 } },
    {
      $facet: {
        meta: [{ $count: "total" }],
        data: [
          { $skip: (Number(page) - 1) * Number(limit) },
          { $limit: Number(limit) },
        ],
      },
    },
  ]);
  return result;
};

const getCourseWithReviewFromDB = async (courseId: string) => {
  const result = await Course.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(courseId) } },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "courseId",
        as: "reviews",
      },
    },
  ]);
  if (!result.length) {
    throw new AppError(404, "Course not found");
  }
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...remainingCourseData } = payload;
  const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    remainingCourseData,
    { new: true, runValidators: true }
  );
  if (!updatedBasicCourseInfo) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Failed to update course");
  }
  if (tags && tags.length > 0) {
    const deletedTags = tags
      .filter((el) => el.name && el.isDeleted)
      .map((el) => el.name);
    const deletedTagsCourse = await Course.findByIdAndUpdate(
      id,
      {
        $pull: {
          tags: { name: { $in: deletedTags } },
        },
      },
      { new: true, runValidators: true }
    );
    if (!deletedTagsCourse) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Failed to update course");
    }
    const newTags = tags?.filter((el) => el.name && !el.isDeleted);
    const newTagCourse = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet: { tags: { $each: newTags } },
      },
      { new: true, runValidators: true }
    );
    if (!newTagCourse) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Failed to update course");
    }
  }
  const result = await Course.findById(id).populate("category");
  return result;
};

export const CourseService = {
  createCourseIntoDB,
  getCoursesFromDB,
  getCourseWithReviewFromDB,
  updateCourseIntoDB,
};
