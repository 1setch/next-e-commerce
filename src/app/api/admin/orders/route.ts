// app/api/admin/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/db/mongoose';
import Order from '@/lib/db/models/Order';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret');

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin only' }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  await dbConnect();
  const orders = await Order.find({ status: { $ne: 'cart' } })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(
    orders.map((o: any) => ({ ...o, _id: String(o._id) }))
  );
}