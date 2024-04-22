import mongoose, { Schema } from "mongoose";
import { WishlistType } from "../types/types";

const WishlistSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    },
  ],
});

const WishList = mongoose.model<WishlistType>("Cart", WishlistSchema);

export default WishList;
