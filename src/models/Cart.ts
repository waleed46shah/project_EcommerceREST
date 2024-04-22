import mongoose, { Schema } from "mongoose";
import { CartType } from "../types/types";

const CartSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

const Cart = mongoose.model<CartType>("Cart", CartSchema);

export default Cart;
