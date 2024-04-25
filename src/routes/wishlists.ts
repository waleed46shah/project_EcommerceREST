import express, { NextFunction, Request, Response } from "express";
import WishList from "../models/Wishlist";
import { CustomError } from "../middleware/error";

const router = express.Router();

//ADD TO WISHLIST ROUTE
router.post("/add", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, productId } = req.body;
    let wishlist = await WishList.findOne({ user: userId });
    if (!wishlist) {
      wishlist = await WishList.create({ user: userId, products: [] });
    }

    if (
      wishlist.products.find((item) => item.product.toString() === productId)
    ) {
      throw new CustomError(400, "Product already exists in the wishlist");
    }

    wishlist.products.push({ product: productId });
    await wishlist.save();
    res
      .status(200)
      .json({ message: "Product added to wishlist successfully!" });
  } catch (error) {
    next(error);
  }
});

//GET USER'S WISHLIST ROUTE
router.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const wishlist = await (
        await WishList.findOne({ user: userId })
      ).populate("products.product");
      if (!wishlist) {
        throw new CustomError(404, "Wishlist is empty!");
      }
      res.status(200).json(wishlist);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
