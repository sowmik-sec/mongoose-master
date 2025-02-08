import { courseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

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

export const CourseService = {
  createCourseIntoDB,
  getCoursesFromDB,
};
