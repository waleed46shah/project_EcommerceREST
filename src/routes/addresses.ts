import express, { NextFunction, Request, Response } from "express";
import Address from "../models/Address";
import { CustomError } from "../middleware/error";

const router = express.Router();

// CREATE ADDRESS ROUTE
router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    const newAddress = new Address(req.body);
    try {
      const savedAddress = await newAddress.save();
      res.status(201).json(savedAddress);
    } catch (error) {
      console.log("err");
      next(error);
    }
  }
);

// UPDATE ADDRESS ROUTE
router.put(
  "/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedAddress = await Address.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedAddress);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE ADDRESS ROUTE
router.delete(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Address.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Address deleted successfully!" });
    } catch (error) {
      next(error);
    }
  }
);

//GET USER ADDRESSES
router.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addresses = await Address.find({ user: req.params.userId });
      res.status(200).json(addresses);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
