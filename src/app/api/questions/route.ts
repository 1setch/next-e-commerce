// app/api/questions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/db/mongoose';
import Question from '@/lib/db/models/Question';

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

// Получить вопросы для товара
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ error: 'productId is required' }, { status: 400 });
  }

  await dbConnect();
  const questions = await Question.find({ productId })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(
    questions.map((q: any) => ({ ...q, _id: String(q._id) }))
  );
}

// Создать вопрос
export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  const { productId, question, userName } = await request.json();

  if (!productId || !question || !userName) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  await dbConnect();
  const q = await Question.create({
    productId,
    userId: userId || undefined,
    userName,
    question,
  });

  return NextResponse.json({ ...q.toObject(), _id: String(q._id) }, { status: 201 });
}