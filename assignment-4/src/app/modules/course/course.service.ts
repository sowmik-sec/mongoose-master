import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { courseSearchableFields } from "./course.constant";
import { Course } from "./course.model";
import { TCourse } from "./course.interface";
import mongoose from "mongoose";
import { JwtPayload } from "jsonwebtoken";

const createCourseIntoDB = async (user: JwtPayload, payload: TCourse) => {
  payload.createdBy = user._id;
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
        meta: [
          { $count: "total" },
          {
            $addFields: {
              page: Number(page),
              limit: Number(limit),
            },
          },
        ],
        data: [
          { $skip: (Number(page) - 1) * Number(limit) },
          { $limit: Number(limit) },
          {
            $lookup: {
              from: "users",
              localField: "createdBy",
              foreignField: "_id",
              as: "createdBy",
              pipeline: [
                {
                  $project: {
                    password: 0,
                  },
                },
              ],
            },
          },
          {
            $unwind: "$createdBy",
          },
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
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "createdBy",
              foreignField: "_id",
              as: "createdBy",
              pipeline: [
                {
                  $project: {
                    password: 0,
                    passwordHistory: 0,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      $unwind: "$createdBy",
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
        pipeline: [
          {
            $project: {
              password: 0,
              passwordHistory: 0,
            },
          },
        ],
      },
    },
    {
      $unwind: "$createdBy",
    },
  ]);
  if (!result.length) {
    throw new AppError(404, "Course not found");
  }
  return { course: result[0] };
};

const getBestCourseFromDB = async () => {
  const result = await Course.aggregate([
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "courseId",
        pipeline: [
          {
            $group: {
              _id: "$courseId",
              averageRating: { $avg: "$rating" },
            },
          },
        ],
        as: "avgRatings",
      },
    },
    {
      $addFields: {
        averageRating: { $arrayElemAt: ["$avgRatings.averageRating", 0] },
      },
    },
    {
      $match: { averageRating: { $exists: true, $ne: null } },
    },
    {
      $sort: { averageRating: -1 },
    },
    {
      $limit: 1,
    },
  ]);
  return result[0];
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...remainingCourseData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingCourseData,
  };
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdatedData[`details.${key}`] = value;
    }
  }

  const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    modifiedUpdatedData,
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

  const result = await Course.findById(id).populate("categoryId");
  return result;
};

export const CourseService = {
  createCourseIntoDB,
  getCoursesFromDB,
  getCourseWithReviewFromDB,
  getBestCourseFromDB,
  updateCourseIntoDB,
};
