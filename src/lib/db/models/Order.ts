// lib/db/models/Order.ts
import mongoose, { Schema, Model } from 'mongoose';

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  colorHex: string;
  size: string;
  quantity: number;
}

export interface IOrder {
  _id?: string;
  userId: string;
  items: IOrderItem[];
  status: 'cart' | 'paid' | 'shipped' | 'delivered';
  address?: {
    name: string;
    phone: string;
    email: string;      // ← добавить
    city: string;
    street: string;
    zip: string;
  };
  totalPrice: number;
  createdAt?: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true, index: true },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        image: String,
        color: String,
        colorHex: String,
        size: String,
        quantity: Number,
      },
    ],
    status: {
      type: String,
      enum: ['cart', 'paid', 'shipped', 'delivered'],
      default: 'cart',
    },
    address: {
      name: { type: String },
      phone: { type: String },
      email: { type: String },    // ← добавить
      city: { type: String },
      street: { type: String },
      zip: { type: String },
    },
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;