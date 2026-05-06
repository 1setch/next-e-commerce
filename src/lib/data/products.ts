// lib/data/products.ts

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  details?: string[];
  colors: ProductColor[];
  sizes: string[];
  category: string;
  isNew: boolean;
  isBestseller: boolean;
  images: string[];
  createdAt?: string;
}

// Тестовый товар для проверки
export const mockProducts: Product[] = [
  {
    _id: "1",
    name: "Test",
    price: 100,
    rating: 4.5,
    reviewCount: 10,
    description: "Test description",
    details: ["Test description"],
    colors: [{ name: "Red", hex: "#ff0000" }],
    sizes: ["M"],
    category: "Test",
    isNew: true,
    isBestseller: false,
    images: ["https://example.com/image.jpg"],
  },
];
