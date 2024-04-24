import express, { NextFunction, Request, Response } from "express";
import Product from "../models/Product";
import { CustomError } from "../middleware/error";

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

// GET ALL PRODUCTS ROUTE
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// GET PRODUCT BASED ON CATERGORY ROUTE
router.get(
  "/:category",
  async (req: Request, res: Response, next: NextFunction) => {
    const category = req.params.category;
    try {
      const products = await Product.find({ category });
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
); //issue: category is case sensitive, should be case insensitive

// GET PRODUCT BY ID ROUTE
router.get(
  "/get/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
