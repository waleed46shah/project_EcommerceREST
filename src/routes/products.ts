import express, { NextFunction, Request, Response } from "express";
import Product from "../models/Product";

const router = express.Router();

// CREATE PRODUCT ROUTE (ADMIN ONLY)
router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    const newProduct = new Product(req.body);
    try {
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      next(error);
    }
  }
);

// SEARCH PRODUCT ROUTE
router.get(
  "/search/:query",
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.params.query;
    try {
      const products = await Product.find({
        $or: [
          { name: { $regex: new RegExp(query, "i") } },
          { category: { $regex: new RegExp(query, "i") } },
        ],
      });
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
