import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { CustomError } from "../middleware/error";

const router = express.Router();

// UPDATE USER ROUTE
router.put(
  "/update/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;
      }

      const user = await User.findById(req.params.userId);
      if (!user) {
        throw new CustomError(404, "User not found!");
      }
      const updateUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(updateUser);
    } catch (error) {
      next(error);
    }
  }
);

//GET USER ROUTE
router.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new CustomError(404, "User not found!");
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

//DELETE USER ROUTE
router.delete(
  "/delete/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    try {
      const userToDelete = await User.findById(userId);
      if (!userToDelete) {
        throw new CustomError(404, "User not found!");
      }
      await userToDelete.deleteOne();
      res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
