import express, { NextFunction, Request, Response } from "express";
import Cart from "../models/Cart";

const router = express.Router();

// ADD TO CART ROUTE
router.post("/add", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity: quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart successfully!" });
  } catch (error) {
    next(error);
  }
});

export default router;
