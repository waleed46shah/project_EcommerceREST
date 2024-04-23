import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connectDB";
import authRoute from "./routes/auth";
import { errorHandler } from "./middleware/error";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + process.env.PORT);
});
