import express, { NextFunction, Request, Response } from "express";
import Cart from "../models/Cart";
import { CustomError } from "../middleware/error";

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

//REMOVE ITEM FROM CART ROUTE (REMOVE -1 FROM QUANTITY)
router.post(
  "/remove",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId, userId } = req.body;
      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        throw new CustomError(404, "Cart is empty!");
      }

      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );
      if (productIndex !== -1) {
        if (cart.products[productIndex].quantity > 1) {
          cart.products[productIndex].quantity -= 1;
        } else {
          cart.products.splice(productIndex, 1);
        }

        await cart.save();
        res
          .status(200)
          .json({ message: "Item removed from cart successfully!" });
      } else {
        throw new CustomError(404, "Product not found in cart!");
      }
    } catch (error) {
      next(error);
    }
  }
);

//GET USER CART ROUTE
router.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const cart = await (
        await Cart.findOne({ user: userId })
      ).populate("products.product");
      if (!cart) {
        throw new CustomError(404, "Cart is empty!");
      }
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
