import mongoose, { Document } from "mongoose";

import { ProductDocument, ProductSchema } from "./Product";

// ProductOrder = Product+quantity
export type ProductOrder = ProductDocument & {
  quantity: number;
};

// type from typescript
export type OrderDocument = Document & {
  createdAt: Date;
  productList: ProductOrder[];
  userId: string;
};

const ProductOrderSchema = new mongoose.Schema({
  title: { type: String },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
  quantity: { type: Number },
});

// add quantity to product in order document
const OrderSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // syntax embed
  productList: [ProductOrderSchema],
  // ref to User Document
  // user detail
  //1: embed user
  // 2: populate
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  total: {
    type: Number,
  },
});

export default mongoose.model<OrderDocument>("Order", OrderSchema);

// embed product =>
// populate => find product => join data from product to order => slow
// 1 order : 2 products
// 3 queries:
// 1: get order
// 2: get product detail 1
// 3: get product detail 2
