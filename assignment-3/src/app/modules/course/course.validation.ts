import { z } from "zod";

// Zod schema for a single tag
const tagValidationSchema = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

// Zod schema for creating a course
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    instructor: z.string().min(1, { message: "Instructor is required" }),
    categoryId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid category ID" }),
    price: z.number().positive({ message: "Price must be a positive number" }),
    tags: z.array(tagValidationSchema).optional(),
    startDate: z.string().min(1, { message: "Start date is required" }),
    endDate: z.string().min(1, { message: "End date is required" }),
    language: z.string().min(1, { message: "Language is required" }),
    provider: z.string().min(1, { message: "Provider is required" }),
    durationInWeeks: z
      .number()
      .int()
      .positive({ message: "Duration must be a positive integer" }),
    details: z.object({
      level: z.enum(["beginner", "intermediate", "advanced"]),
      description: z.string().min(1, { message: "Description is required" }),
    }),
  }),
});

// Zod schema for updating a course (all fields optional)
const updateCourseValidationSchema = createCourseValidationSchema.partial();

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
