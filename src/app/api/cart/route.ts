// app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import dbConnect from "@/lib/db/mongoose";
import Order from "@/lib/db/models/Order";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret",
);

async function getUserId(request: NextRequest): Promise<string | null> {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.userId as string;
  } catch {
    return null;
  }
}

// Получить корзину
export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await dbConnect();
  let cart = await Order.findOne({ userId, status: "cart" }).lean();

  if (!cart) {
    return NextResponse.json({ items: [], totalPrice: 0 });
  }

  // Чистим _id у вложенных объектов colors
  const items = (cart.items || []).map((item: any) => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    image: item.image,
    color: item.color,
    colorHex: item.colorHex,
    size: item.size,
    quantity: item.quantity,
  }));

  return NextResponse.json({
    _id: String(cart._id),
    items,
    totalPrice: cart.totalPrice,
  });
}

// Сохранить корзину
export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { items, totalPrice } = await request.json();

  await dbConnect();

  const cart = await Order.findOneAndUpdate(
    { userId, status: "cart" },
    { $set: { items, totalPrice } },
    { upsert: true, new: true },
  );

  return NextResponse.json({
    _id: String(cart._id),
    items: cart.items,
    totalPrice: cart.totalPrice,
  });
}

// Создать заказ (checkout)
export async function PUT(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { address, totalPrice } = await request.json();

  await dbConnect();

  const cart = await Order.findOne({ userId, status: "cart" });
  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  cart.status = "pending";
  cart.address = address;
  cart.totalPrice = totalPrice;
  await cart.save();

  return NextResponse.json({ orderId: String(cart._id), status: "pending" });
}
