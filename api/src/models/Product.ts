import mongoose, { Document } from "mongoose";

export type ProductDocument = Document & {
  title: string;
  price: number;
  image: string;
};

export const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

export default mongoose.model<ProductDocument>("Product", ProductSchema);
