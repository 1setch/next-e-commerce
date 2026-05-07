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

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await request.json();
  console.log('Review body:', body);

  const { productId, rating, text, userName, userImage } = body;

  if (!productId || !rating) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    await dbConnect();

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

    const existing = await Review.findOne({ userId, productId });
    if (existing) {
      return NextResponse.json(
        { error: 'You have already reviewed this product' },
        { status: 409 }
      );
    }

    const review = await Review.create({
      userId,
      userName: userName || 'User',
      userImage: userImage || '',
      productId,
      rating,
      text: text || '',
    });

    const allReviews = await Review.find({ productId });
    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: allReviews.length,
    });

    const saved = review.toObject();
    return NextResponse.json({ ...saved, _id: String(saved._id) }, { status: 201 });
  } catch (error: any) {
    console.error('Review creation error:', error.message, error.stack);
    return NextResponse.json(
      { error: error.message || 'Failed to create review' },
      { status: 500 }
    );
  }
}