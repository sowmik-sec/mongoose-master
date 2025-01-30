import { z } from "zod";
import mongoose from "mongoose";

const orderValidationSchema = z.object({
  user: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid user ID format",
  }),
  price: z.number().positive("Price must be a positive number"),
  productName: z.string().min(1, "Product name is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

// Type export matching TOrder interface
export type TOrderValidation = z.infer<typeof orderValidationSchema>;
export default orderValidationSchema;
