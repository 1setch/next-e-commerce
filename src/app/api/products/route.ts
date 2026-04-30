    // app/api/products/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/data/products';
import { filterProducts } from '@/lib/utils/filterProducts';
import { FilterParams } from '@/lib/utils/filterProducts';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const category = searchParams.get('category') || undefined;
    const color = searchParams.get('color') || undefined;
    const size = searchParams.get('size') || undefined;
    const sort = (searchParams.get('sort') as FilterParams['sort']) || 'newest';
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 9;
    const search = searchParams.get('search') || undefined;

    const result = filterProducts(mockProducts, {
      category,
      color,
      size,
      sort,
      minPrice,
      maxPrice,
      page,
      limit,
      search,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Products API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}