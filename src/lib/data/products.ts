// lib/data/products.ts

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  colors: ProductColor[];
  sizes: string[];
  category: string;
  isNew: boolean;
  isBestseller: boolean;
  images: string[];
}

export const getProductImage = (id: number, width = 400, height = 500) =>
  `https://loremflickr.com/${width}/${height}/clothing?random=${id}`;

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "One Life Graphic T-shirt",
    price: 300,
    discountPrice: 260,
    rating: 4.5,
    reviewCount: 128,
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    colors: [
      { name: "Burgundy", hex: "#b42b2b" },
      { name: "Forest Green", hex: "#2e5c2e" },
      { name: "Navy", hex: "#1a1a3e" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "T-shirts",
    isNew: true,
    isBestseller: false,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(2, 400, 500),
      getProductImage(3, 400, 500),
    ],
  },
  {
    id: 2,
    name: "Classic White Tee",
    price: 120,
    rating: 4.2,
    reviewCount: 95,
    description:
      "A timeless white t-shirt made from 100% organic cotton. Essential for every wardrobe.",
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#808080" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    category: "T-shirts",
    isNew: false,
    isBestseller: true,
    images: [
      getProductImage(4, 400, 500),
      getProductImage(6, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(5, 400, 500),
    ],
  },
  {
    id: 3,
    name: "Slim Fit Chinos",
    price: 180,
    discountPrice: 144,
    rating: 4.8,
    reviewCount: 210,
    description:
      "Modern slim fit chinos in stretch cotton twill. Comfortable all-day wear with a sharp look.",
    colors: [
      { name: "Khaki", hex: "#c3b091" },
      { name: "Navy", hex: "#1a1a3e" },
      { name: "Olive", hex: "#556B2F" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    category: "Pants",
    isNew: false,
    isBestseller: true,
    images: [
      getProductImage(7, 400, 500),
      getProductImage(8, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(9, 400, 500),
    ],
  },
  {
    id: 4,
    name: "Denim Jacket",
    price: 250,
    discountPrice: 200,
    rating: 4.6,
    reviewCount: 167,
    description:
      "Classic denim jacket with a modern twist. Features chest pockets and adjustable waist tabs.",
    colors: [
      { name: "Light Blue", hex: "#add8e6" },
      { name: "Dark Wash", hex: "#1c3a5e" },
      { name: "Black", hex: "#000000" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "Jackets",
    isNew: true,
    isBestseller: false,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
  {
    id: 5,
    name: "Oversized Hoodie",
    price: 160,
    rating: 4.4,
    reviewCount: 289,
    description:
      "Cozy oversized hoodie with dropped shoulders. Made from heavyweight fleece for extra warmth.",
    colors: [
      { name: "Heather Gray", hex: "#a9a9a9" },
      { name: "Cream", hex: "#f5f5dc" },
      { name: "Black", hex: "#000000" },
      { name: "Sage Green", hex: "#8fbc8f" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "Hoodies",
    isNew: false,
    isBestseller: true,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
  {
    id: 6,
    name: "Linen Shorts",
    price: 90,
    rating: 4.1,
    reviewCount: 73,
    description:
      "Breathable linen shorts perfect for summer. Elastic waistband with drawstring for comfort.",
    colors: [
      { name: "Beige", hex: "#d4c4a8" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Light Blue", hex: "#add8e6" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "Shorts",
    isNew: true,
    isBestseller: false,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
  {
    id: 7,
    name: "Striped Oxford Shirt",
    price: 140,
    discountPrice: 112,
    rating: 4.7,
    reviewCount: 156,
    description:
      "Premium oxford shirt with subtle stripe pattern. Button-down collar and chest pocket.",
    colors: [
      { name: "Blue Stripe", hex: "#4169e1" },
      { name: "Pink Stripe", hex: "#ffb6c1" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "Shirts",
    isNew: false,
    isBestseller: true,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
  {
    id: 8,
    name: "Cargo Pants",
    price: 170,
    rating: 4.3,
    reviewCount: 112,
    description:
      "Functional cargo pants with multiple pockets. Durable cotton ripstop fabric.",
    colors: [
      { name: "Olive", hex: "#556B2F" },
      { name: "Black", hex: "#000000" },
      { name: "Tan", hex: "#d2b48c" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    category: "Pants",
    isNew: false,
    isBestseller: false,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
  {
    id: 9,
    name: "Graphic Print Hoodie",
    price: 190,
    discountPrice: 152,
    rating: 4.5,
    reviewCount: 198,
    description:
      "Bold graphic print hoodie with front kangaroo pocket. Soft brushed interior.",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    category: "Hoodies",
    isNew: true,
    isBestseller: false,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
  {
    id: 10,
    name: "Wool Blend Coat",
    price: 350,
    discountPrice: 280,
    rating: 4.9,
    reviewCount: 84,
    description:
      "Elegant wool blend coat with notched lapels. Fully lined with interior pocket.",
    colors: [
      { name: "Camel", hex: "#c19a6b" },
      { name: "Charcoal", hex: "#36454f" },
      { name: "Black", hex: "#000000" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "Jackets",
    isNew: false,
    isBestseller: true,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
  {
    id: 11,
    name: "Tennis Skirt",
    price: 110,
    rating: 4.0,
    reviewCount: 56,
    description:
      "Pleated tennis skirt with built-in shorts. Moisture-wicking fabric for active days.",
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#1a1a3e" },
    ],
    sizes: ["XS", "Small", "Medium", "Large"],
    category: "Skirts",
    isNew: true,
    isBestseller: false,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
  {
    id: 12,
    name: "Ribbed Tank Top",
    price: 60,
    rating: 3.9,
    reviewCount: 142,
    description:
      "Fitted ribbed tank top with high neckline. Stretchy and comfortable for layering.",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Brown", hex: "#8b4513" },
      { name: "Dusty Pink", hex: "#d8a7b1" },
    ],
    sizes: ["XS", "Small", "Medium", "Large", "X-Large"],
    category: "T-shirts",
    isNew: false,
    isBestseller: false,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
  {
    id: 13,
    name: "Relaxed Fit Jeans",
    price: 200,
    rating: 4.6,
    reviewCount: 230,
    description:
      "Relaxed fit jeans with straight leg. Vintage wash with comfortable stretch.",
    colors: [
      { name: "Light Wash", hex: "#a4c2d1" },
      { name: "Medium Wash", hex: "#5c7d9e" },
      { name: "Dark Wash", hex: "#1c3a5e" },
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    category: "Pants",
    isNew: false,
    isBestseller: true,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
  {
    id: 14,
    name: "Cropped Sweater",
    price: 130,
    discountPrice: 104,
    rating: 4.3,
    reviewCount: 88,
    description:
      "Soft knit cropped sweater with ribbed trims. Perfect with high-waisted bottoms.",
    colors: [
      { name: "Cream", hex: "#f5f5dc" },
      { name: "Lavender", hex: "#b57edc" },
      { name: "Rust", hex: "#b7410e" },
    ],
    sizes: ["Small", "Medium", "Large"],
    category: "Sweaters",
    isNew: true,
    isBestseller: false,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
  {
    id: 15,
    name: "Bomber Jacket",
    price: 220,
    rating: 4.7,
    reviewCount: 145,
    description:
      "Lightweight bomber jacket with zip front and ribbed collar. Water-resistant finish.",
    colors: [
      { name: "Olive", hex: "#556B2F" },
      { name: "Black", hex: "#000000" },
      { name: "Burgundy", hex: "#b42b2b" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "Jackets",
    isNew: false,
    isBestseller: false,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
  {
    id: 16,
    name: "Polo Shirt",
    price: 100,
    discountPrice: 75,
    rating: 4.4,
    reviewCount: 176,
    description:
      "Classic pique polo shirt with embroidered logo. Breathable cotton for all-day wear.",
    colors: [
      { name: "Navy", hex: "#1a1a3e" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Red", hex: "#C41E3A" },
      { name: "Green", hex: "#2e5c2e" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    category: "Shirts",
    isNew: false,
    isBestseller: true,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
  {
    id: 17,
    name: "Wide Leg Trousers",
    price: 190,
    rating: 4.5,
    reviewCount: 67,
    description:
      "Flowy wide leg trousers with high waist. Pleated front and side pockets.",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Beige", hex: "#d4c4a8" },
    ],
    sizes: ["XS", "Small", "Medium", "Large", "X-Large"],
    category: "Pants",
    isNew: true,
    isBestseller: false,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
  {
    id: 18,
    name: "Fleece Zip-Up",
    price: 150,
    discountPrice: 120,
    rating: 4.6,
    reviewCount: 203,
    description:
      "Warm fleece zip-up jacket with stand collar. Zippered pockets and elastic cuffs.",
    colors: [
      { name: "Charcoal", hex: "#36454f" },
      { name: "Navy", hex: "#1a1a3e" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large", "XX-Large"],
    category: "Jackets",
    isNew: false,
    isBestseller: true,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
  {
    id: 19,
    name: "Swim Shorts",
    price: 70,
    rating: 4.1,
    reviewCount: 49,
    description:
      "Quick-dry swim shorts with mesh lining. Elastic waist with drawstring.",
    colors: [
      { name: "Turquoise", hex: "#40e0d0" },
      { name: "Coral", hex: "#ff7f50" },
      { name: "Black", hex: "#000000" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "Shorts",
    isNew: true,
    isBestseller: false,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
  {
    id: 20,
    name: "Cable Knit Sweater",
    price: 210,
    rating: 4.8,
    reviewCount: 134,
    description:
      "Chunky cable knit sweater with crew neck. Made from merino wool blend.",
    colors: [
      { name: "Cream", hex: "#f5f5dc" },
      { name: "Navy", hex: "#1a1a3e" },
      { name: "Hunter Green", hex: "#355e3b" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "Sweaters",
    isNew: false,
    isBestseller: true,
    images: [
      getProductImage(1, 400, 500),
      getProductImage(1, 400, 500), // потом заменишь на реальные фото других ракурсов
      getProductImage(1, 400, 500),
    ],
  },
];

// Уникальные категории для фильтров
export const categories = [...new Set(mockProducts.map((p) => p.category))];

// Все доступные размеры
export const allSizes = [...new Set(mockProducts.flatMap((p) => p.sizes))];

// Все доступные цвета
export const allColors: ProductColor[] = [
  { name: "Burgundy", hex: "#b42b2b" },
  { name: "Forest Green", hex: "#2e5c2e" },
  { name: "Navy", hex: "#1a1a3e" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
  { name: "Gray", hex: "#808080" },
  { name: "Khaki", hex: "#c3b091" },
  { name: "Olive", hex: "#556B2F" },
  { name: "Light Blue", hex: "#add8e6" },
  { name: "Dark Wash", hex: "#1c3a5e" },
  { name: "Heather Gray", hex: "#a9a9a9" },
  { name: "Cream", hex: "#f5f5dc" },
  { name: "Sage Green", hex: "#8fbc8f" },
  { name: "Beige", hex: "#d4c4a8" },
  { name: "Pink Stripe", hex: "#ffb6c1" },
  { name: "Blue Stripe", hex: "#4169e1" },
  { name: "Tan", hex: "#d2b48c" },
  { name: "Camel", hex: "#c19a6b" },
  { name: "Charcoal", hex: "#36454f" },
  { name: "Dusty Pink", hex: "#d8a7b1" },
  { name: "Brown", hex: "#8b4513" },
  { name: "Light Wash", hex: "#a4c2d1" },
  { name: "Medium Wash", hex: "#5c7d9e" },
  { name: "Lavender", hex: "#b57edc" },
  { name: "Rust", hex: "#b7410e" },
  { name: "Red", hex: "#C41E3A" },
  { name: "Green", hex: "#2e5c2e" },
  { name: "Turquoise", hex: "#40e0d0" },
  { name: "Coral", hex: "#ff7f50" },
  { name: "Hunter Green", hex: "#355e3b" },
  { name: "Rozoviy", hex: "#ae2ebe" },
];
