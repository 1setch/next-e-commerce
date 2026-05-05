// app/api/orders/route.ts (обнови существующий)
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/db/mongoose';
import Order from '@/lib/db/models/Order';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret');

async function getUserId(request: NextRequest): Promise<string | null> {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.userId as string;
  } catch {
    return null;
  }
}

// Получить заказы пользователя
export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  await dbConnect();
  const orders = await Order.find({ userId, status: { $ne: 'cart' } })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(
    orders.map((o: any) => ({
      ...o,
      _id: String(o._id),
    }))
  );
}

// Создать заказ
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    await dbConnect();

    const order = await Order.create({
      userId,
      items: body.items,
      status: 'paid',
      address: body.address,
      totalPrice: body.totalPrice,
    });

    return NextResponse.json({
      orderId: String(order._id),
      status: 'paid',
    });
  } catch (error) {
    console.error('Order Error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}