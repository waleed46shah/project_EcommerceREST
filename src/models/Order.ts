import mongoose, { Schema } from "mongoose";
import { OrderType } from "../types/types";

const OrderSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered"],
    required: true,
  },
  address: { type: Schema.Types.ObjectId, ref: "Address", required: true },
});

const Order = mongoose.model<OrderType>("Order", OrderSchema);

export default Order;
