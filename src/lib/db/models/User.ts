// lib/db/models/User.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  name?: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    name: { type: String },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;