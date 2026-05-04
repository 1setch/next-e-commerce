// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db/mongoose';
import User from '@/lib/db/models/User';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      name: name || '',
      role: 'user',
    });

    return NextResponse.json({
      user: { _id: String(user._id), email: user.email, name: user.name, role: user.role },
    }, { status: 201 });
  } catch (error) {
    console.error('Register Error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}