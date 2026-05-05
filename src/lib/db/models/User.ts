// lib/db/models/User.ts

import mongoose, { Schema, Model } from 'mongoose';

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  name?: string;
  image?: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    name: { type: String },
    image: { type: String },
  },
  { timestamps: true, strict: false }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;