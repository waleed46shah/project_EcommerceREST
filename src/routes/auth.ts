import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import bcrypt from "bcrypt";
import { CustomError } from "../middleware/error";

const router = express.Router();

//REGISTER ROUTE
router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new CustomError(400, "User already exists");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ ...req.body, password: hashedPassword });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      next(error);
    }
  }
);

//LOGIN ROUTE

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new CustomError(400, "User does not exist!");
      }

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        throw new CustomError(400, "Wrong Credentials!");
      }

      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: process.env.JWT_EXPIRE as string,
        }
      );
      res.cookie("token", token).status(200).json("Logged in successfully");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
