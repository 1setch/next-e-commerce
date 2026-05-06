import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/db/mongoose';
import Question from '@/lib/db/models/Question';
import Product from '@/lib/db/models/Product';

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

  // Все вопросы одним запросом
  const questions = await Question.find({})
    .sort({ createdAt: -1 })
    .lean();

  // Собираем productId для массовой загрузки названий
  const productIds = [...new Set(questions.map((q: any) => q.productId))];
  const products = await Product.find({ _id: { $in: productIds } })
    .select('name')
    .lean();

  const productMap: Record<string, string> = {};
  products.forEach((p: any) => {
    productMap[String(p._id)] = p.name;
  });

  const result = questions.map((q: any) => ({
    ...q,
    _id: String(q._id),
    productName: productMap[q.productId] || 'Unknown',
  }));

  // Сортировка: неотвеченные сверху, потом по дате
  result.sort((a, b) => {
    if (a.answer && !b.answer) return 1;
    if (!a.answer && b.answer) return -1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return NextResponse.json(result);
}