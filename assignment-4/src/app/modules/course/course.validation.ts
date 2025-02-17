import mongoose from "mongoose";
import { z } from "zod";

const detailsSchema = z.object({
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  description: z.string().min(1, "Description is required"),
});
const detailsUpdateSchema = z.object({
  level: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
  description: z.string().optional(),
});

const tagSchema = z.object({
  name: z.string().min(1, "Tag name is required"),
  isDeleted: z.boolean(),
});
const tagUpdateSchema = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    instructor: z.string().min(1, "Instructor is required"),
    categoryId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
    price: z.number().min(0, "Price must be a positive number"),
    tags: z.array(tagSchema).optional(),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid start date",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid end date",
    }),
    language: z.string().min(1, "Language is required"),
    provider: z.string().min(1, "Provider is required"),
    details: detailsSchema,
  }),
});

// Zod schema for updating a course (all fields optional)
const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID")
      .optional(),
    price: z.number().optional(),
    tags: z.array(tagUpdateSchema).optional(),
    startDate: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid start date",
      })
      .optional(),
    endDate: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid end date",
      })
      .optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: detailsUpdateSchema,
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
