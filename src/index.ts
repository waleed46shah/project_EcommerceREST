import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connectDB";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";
import productRoute from "./routes/products";
import { errorHandler } from "./middleware/error";
import cookieParser from "cookie-parser";
import verifyToken from "./middleware/verifyToken";
const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", verifyToken, userRoute);
app.use("/api/product/", productRoute);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + process.env.PORT);
});
