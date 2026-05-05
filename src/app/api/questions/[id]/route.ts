// app/api/questions/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/db/mongoose';
import Question from '@/lib/db/models/Question';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret');

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;
  const { answer } = await request.json();

  await dbConnect();
  const q = await Question.findByIdAndUpdate(
    id,
    { answer },
    { new: true }
  ).lean();

  if (!q) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ ...q, _id: String(q._id) });
}