// lib/db/models/Review.ts
import mongoose, { Schema, Model } from 'mongoose';

export interface IReview {
  _id?: string;
  userId: string;
  userName: string;
  userImage?: string;
  productId: string;
  rating: number;
  text: string;
  createdAt?: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    userId: { type: String, required: true, index: true },
    userName: { type: String, required: true },
    userImage: { type: String },
    productId: { type: String, required: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;