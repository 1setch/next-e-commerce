// app/api/auth/me/route.ts (обнови существующий)
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import dbConnect from "@/lib/db/mongoose";
import User from "@/lib/db/models/User";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret",
);

async function getUserId(request: NextRequest): Promise<string | null> {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.userId as string;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await dbConnect();
  const user = await User.findById(userId).select("-password").lean();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  console.log("GET user:", user); // проверь что image есть

  return NextResponse.json({
    user: { ...user, _id: String(user._id) },
  });
}

export async function PUT(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { name, image } = await request.json();

  await dbConnect();

  await User.updateOne({ _id: userId }, { $set: { name, image } });

  const user = await User.findById(userId).select("-password").lean();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    user: { ...user, _id: String(user._id) },
  });
}
