import express, { Application } from "express";
export const app: Application = express();

import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.route";
import { OrderRoutes } from "./app/modules/order/order.route";

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/orders", OrderRoutes);
