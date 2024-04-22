import mongoose from "mongoose";
import { UserType } from "../types/types";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<UserType>("User", UserSchema);

export default User;
