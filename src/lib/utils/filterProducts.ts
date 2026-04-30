// lib/utils/filterProducts.ts

import { Product } from "@/lib/data/products";

export interface FilterParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  size?: string;
  sort?: "price-asc" | "price-desc" | "rating" | "newest" | "popular";
  page?: number;
  limit?: number;
}

export function filterProducts(products: Product[], filters: FilterParams) {
  const {
    category,
    minPrice,
    maxPrice,
    color,
    size,
    sort = "newest",
    page = 1,
    limit = 9,
  } = filters;

  // 1. Фильтрация
  let filtered = [...products];

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (color) {
    const colorList = color.split(",");
    filtered = filtered.filter((p) =>
      p.colors.some((c) => colorList.includes(c.name)),
    );
  }

  if (size) {
    filtered = filtered.filter((p) =>
      p.sizes.map((s) => s.toLowerCase()).includes(size.toLowerCase()),
    );
  }

  filtered = filtered.filter((p) => {
    const actualPrice = p.discountPrice ?? p.price;
    if (minPrice !== undefined && actualPrice < minPrice) return false;
    if (maxPrice !== undefined && actualPrice > maxPrice) return false;
    return true;
  });

  // 2. Сортировка
  switch (sort) {
    case "price-asc":
      filtered.sort((a, b) => {
        const priceA = a.discountPrice ?? a.price;
        const priceB = b.discountPrice ?? b.price;
        return priceA - priceB;
      });
      break;

    case "price-desc":
      filtered.sort((a, b) => {
        const priceA = a.discountPrice ?? a.price;
        const priceB = b.discountPrice ?? b.price;
        return priceB - priceA;
      });
      break;

    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;

    case "popular":
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      break;

    case "newest":
    default:
      filtered.sort((a, b) => b.id - a.id);
      break;
  }

  // 3. Пагинация
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const safePage = Math.min(page, totalPages || 1);
  const start = (safePage - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);

  return {
    data,
    total,
    page: safePage,
    totalPages,
  };
}
