import express, { NextFunction, Request, Response } from "express";
import Address from "../models/Address";

const router = express.Router();

// CREATE ADDRESS
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

export default router;
