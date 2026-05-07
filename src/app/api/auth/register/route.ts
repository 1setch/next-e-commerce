// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import dbConnect from '@/lib/db/mongoose';
import User from '@/lib/db/models/User';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      if (!existing.isVerified) {
        return NextResponse.json(
          { error: 'Account exists but not verified. Check your email.' },
          { status: 409 }
        );
      }
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await User.create({
      email,
      password: hashedPassword,
      name: name || '',
      role: 'user',
      isVerified: true,
      verificationToken,
    });

    try {
      await sendVerificationEmail(email, verificationToken);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
    }

    return NextResponse.json({
      message: 'Registration successful. Please check your email to verify your account.',
    }, { status: 201 });
  } catch (error) {
    console.error('Register Error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}