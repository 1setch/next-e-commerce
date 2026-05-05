// lib/db/models/Question.ts
import mongoose, { Schema, Model } from 'mongoose';

export interface IQuestion {
  _id?: string;
  productId: string;
  userId?: string;
  userName: string;
  question: string;
  answer?: string;
  createdAt?: Date;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    productId: { type: String, required: true, index: true },
    userId: { type: String },
    userName: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String },
  },
  { timestamps: true }
);

const Question: Model<IQuestion> =
  mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);

export default Question;