// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import Product from "@/lib/db/models/Product";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = request.nextUrl;

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 9;
    const category = searchParams.get("category") || "";
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 999999;
    const color = searchParams.get("color") || "";
    const size = searchParams.get("size") || "";
    const sort = searchParams.get("sort") || "newest";
    const search = searchParams.get("search") || "";

    const filter: Record<string, unknown> = {};
    const isNewProduct = searchParams.get("isNew");
    const discount = searchParams.get("discount");

    if (isNewProduct === "true") filter.isNewProduct = true;
    if (discount === "true")
      filter.discountPrice = { $exists: true, $ne: null };

    if (category) filter.category = category;
    if (minPrice > 0 || maxPrice < 999999) {
      filter.$or = [
        { price: { $gte: minPrice, $lte: maxPrice } },
        { discountPrice: { $gte: minPrice, $lte: maxPrice } },
      ];
    }
    if (color) {
      const colors = color.split(",");
      filter["colors.name"] = { $in: colors };
    }
    if (size) filter.sizes = size;
    if (search) filter.name = { $regex: search, $options: "i" };

    let sortObj: Record<string, 1 | -1> = {};
    switch (sort) {
      case "price-asc":
        sortObj = { price: 1 };
        break;
      case "price-desc":
        sortObj = { price: -1 };
        break;
      case "rating":
        sortObj = { rating: -1 };
        break;
      case "popular":
        sortObj = { reviewCount: -1 };
        break;
      case "newest":
      default:
        sortObj = { createdAt: -1 };
    }

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean();

    const cleaned = products.map((p: any) => ({
      ...p,
      _id: String(p._id),
      isNew: p.isNewProduct, // ← добавить
      isBestseller: p.isBestseller, // ← это уже есть через ...p
      colors: p.colors.map((c: any) => ({ name: c.name, hex: c.hex })),
    }));

    return NextResponse.json({
      data: cleaned,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    console.error("Products API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json({ data: product }, { status: 201 });
  } catch (error) {
    console.error("Create Product Error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
