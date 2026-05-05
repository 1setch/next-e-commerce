// app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/db/mongoose';
import Review from '@/lib/db/models/Review';
import Order from '@/lib/db/models/Order';
import Product from '@/lib/db/models/Product';

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

// Получить отзывы для товара
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ error: 'productId is required' }, { status: 400 });
  }

  await dbConnect();
  const reviews = await Review.find({ productId })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(
    reviews.map((r: any) => ({ ...r, _id: String(r._id) }))
  );
}

// Создать отзыв
export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { productId, rating, text, userName, userImage } = await request.json();

  if (!productId || !rating || !text) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  await dbConnect();

  // Проверить что пользователь купил этот товар
  const order = await Order.findOne({
    userId,
    status: { $in: ['paid', 'shipped', 'delivered'] },
    'items.productId': productId,
  });

  if (!order) {
    return NextResponse.json(
      { error: 'You can only review products you have purchased' },
      { status: 403 }
    );
  }

  // Проверить что ещё не оставлял отзыв
  const existing = await Review.findOne({ userId, productId });
  if (existing) {
    return NextResponse.json(
      { error: 'You have already reviewed this product' },
      { status: 409 }
    );
  }

  // Создать отзыв
  const review = await Review.create({
    userId,
    userName: userName || 'User',
    userImage: userImage || '',
    productId,
    rating,
    text,
  });

  // Обновить рейтинг товара
  const allReviews = await Review.find({ productId });
  const avgRating =
    allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

  await Product.findByIdAndUpdate(productId, {
    rating: Math.round(avgRating * 10) / 10,
    reviewCount: allReviews.length,
  });

  const saved = review.toObject();
  return NextResponse.json({ ...saved, _id: String(saved._id) }, { status: 201 });
}