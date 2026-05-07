// app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongoose';
import User from '@/lib/db/models/User';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login?error=invalid-token', request.url));
  }

  await dbConnect();
  const user = await User.findOneAndUpdate(
    { verificationToken: token, isVerified: false },
    { $set: { isVerified: true, verificationToken: null } },
    { new: true }
  );

  if (!user) {
    return NextResponse.redirect(new URL('/login?error=invalid-or-expired-token', request.url));
  }

  return NextResponse.redirect(new URL('/login?verified=true', request.url));
}