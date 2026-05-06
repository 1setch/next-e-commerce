// lib/db/models/Product.ts
import mongoose, { Schema, Model } from "mongoose";

export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  details?: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  category: string;
  isNewProduct: boolean;
  isBestseller: boolean;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    rating: { type: Number, default: 5 },
    reviewCount: { type: Number, default: 0 },
    description: { type: String, required: true },
    details: [{ type: String }],
    colors: [{ name: { type: String }, hex: { type: String } }],
    sizes: [{ type: String }],
    category: { type: String, required: true },
    isNewProduct: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true, autoIndex: false }
);

// Удаляем проблемный текстовый индекс если есть
ProductSchema.pre("save", async function () {
  try {
    await mongoose.model("Product").collection.dropIndex("text_1");
  } catch {}
});

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
