import mongoose from "mongoose";

export type UserType = mongoose.Document & {
  name: string;
  email: string;
  password: string;
};

export type ProductType = mongoose.Document & {
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string[];
  color: string[];
  size: string[];
};

export type OrderType = mongoose.Document & {
  user: mongoose.Types.ObjectId;
  products: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  status: string;
  address: mongoose.Types.ObjectId;
};

export type CartType = mongoose.Document & {
  user: mongoose.Types.ObjectId;
  products: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];
};

export type WishlistType = mongoose.Document & {
  user: mongoose.Types.ObjectId;
  products: {
    product: mongoose.Types.ObjectId;
  }[];
};

export type AddressType = mongoose.Document & {
  name: mongoose.Types.ObjectId;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone: string;
};