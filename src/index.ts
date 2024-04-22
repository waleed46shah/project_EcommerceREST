import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connectDB";

const app = express();

dotenv.config();

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + process.env.PORT);
});
