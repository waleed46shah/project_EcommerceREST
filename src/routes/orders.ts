import express, { NextFunction, Request, Response } from "express";
import Order from "../models/Order";

const router = express.Router();

//CREATE ORDERS
router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    const newOrder = new Order(req.body);
    try {
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      next(error);
    }
  }
);

//DELETE ORDER
router.delete(
  "/cancel/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.id);
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Order cancelled!" });
    } catch (error) {
      next(error);
    }
  }
);

//GET USER ORDERS
router.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await Order.find({ user: req.params.userId });
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
