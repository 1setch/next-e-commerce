// scripts/seedProducts.ts
import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(process.cwd(), '.env.local') });

import mongoose from 'mongoose';
import dbConnect from '../src/lib/db/mongoose';
import Product from '../src/lib/db/models/Product';

interface NewProduct {
  name: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  category: string;
  isNewProduct: boolean;
  isBestseller: boolean;
  images: string[];
}

const products: NewProduct[] = [
  {
    name: 'Топ из рибового полотна',
    price: 1990,
    rating: 4.6,
    reviewCount: 34,
    description: 'Элегантный топ из мягкого рибового полотна. Плотно облегает фигуру, подчеркивая силуэт. Идеален как для повседневной носки, так и для вечерних образов.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Бежевый', hex: '#d4c4a8' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Топы и футболки',
    isNewProduct: true,
    isBestseller: true,
    images: [
      '/prod_assets/Топ из рибового полотна_1.jpg',
      '/prod_assets/Топ из рибового полотна_2.jpg',
      '/prod_assets/Топ из рибового полотна_3.jpg',
    ],
  },
  {
    name: 'Блузка с воланами',
    price: 2490,
    discountPrice: 1990,
    rating: 4.8,
    reviewCount: 52,
    description: 'Романтичная блузка с изящными воланами. Лёгкая струящаяся ткань создаёт воздушный силуэт. Втачные рукава, круглый вырез.',
    colors: [
      { name: 'Молочный', hex: '#e9f5f5' },
      { name: 'Розовый', hex: '#ffb6c1' },
      { name: 'Голубой', hex: '#add8e6' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Блузки и рубашки',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/Блузка с воланами_1.jpg',
      '/prod_assets/Блузка с воланами_2.jpg',
      '/prod_assets/Блузка с воланами_3.jpg',
    ],
  },
  {
    name: 'Толстовка с капюшоном из велюра',
    price: 3490,
    rating: 4.9,
    reviewCount: 78,
    description: 'Уютная толстовка из мягкого велюра. Капюшон на подкладке, карман-кенгуру, манжеты и низ на резинке. Идеальна для прохладной погоды.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Серый', hex: '#808080' },
      { name: 'Бежевый', hex: '#d4c4a8' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'Кофты и толстовки',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/Толстовка с капюшоном из велюра_1.jpg',
      '/prod_assets/Толстовка с капюшоном из велюра_2.jpg',
      '/prod_assets/Толстовка с капюшоном из велюра_3.jpg',
    ],
  },
  {
    name: 'Трикотажное платье из рибового полотна с завязками',
    price: 3290,
    discountPrice: 2690,
    rating: 4.5,
    reviewCount: 41,
    description: 'Стильное трикотажное платье с завязками на талии. Мягкое рибовое полотно приятно на ощупь. По бокам — разрезы.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Коричневый', hex: '#8b4513' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Платья',
    isNewProduct: true,
    isBestseller: true,
    images: [
      '/prod_assets/Трикотажное платье из рибового полотна с завязками_1.jpg',
      '/prod_assets/Трикотажное платье из рибового полотна с завязками_2.jpg',
      '/prod_assets/Трикотажное платье из рибового полотна с завязками_3.jpg',
    ],
  },
  {
    name: 'Футболка с принтом',
    price: 1490,
    rating: 4.3,
    reviewCount: 93,
    description: 'Базовая футболка с оригинальным принтом. Прямой крой, круглый вырез. Изготовлена из 100% хлопка.',
    colors: [
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Серый', hex: '#a9a9a9' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    category: 'Топы и футболки',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/Футболка с принтом_1.jpg',
      '/prod_assets/Футболка с принтом_2.jpg',
      '/prod_assets/Футболка с принтом_3.jpg',
    ],
  },
  {
    name: 'Платье красное',
    price: 3990,
    discountPrice: 3190,
    rating: 4.7,
    reviewCount: 28,
    description: 'Эффектное красное платье. Приталенный силуэт, расклешённая юбка, потайная молния сзади. Идеально для особых случаев.',
    colors: [
      { name: 'Красный', hex: '#C41E3A' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Платья',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/Платье красное_1.jpg',
      '/prod_assets/Платье красное_2.jpg',
      '/prod_assets/Платье красное_3.jpg',
    ],
  },
  {
    name: 'Шорты с подворотами',
    price: 2190,
    rating: 4.4,
    reviewCount: 56,
    description: 'Удобные шорты с подворотами. Высокая посадка, пояс на резинке, боковые карманы. Идеальны для лета.',
    colors: [
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Бежевый', hex: '#d4c4a8' },
      { name: 'Голубой', hex: '#add8e6' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Шорты',
    isNewProduct: false,
    isBestseller: false,
    images: [
      '/prod_assets/Шорты с подворотами_1.jpg',
      '/prod_assets/Шорты с подворотами_2.jpg',
      '/prod_assets/Шорты с подворотами_3.jpg',
    ],
  },
  {
    name: 'Брюки-джоггеры',
    price: 2890,
    rating: 4.6,
    reviewCount: 67,
    description: 'Стильные брюки-джоггеры. Манжеты на резинке, удобный пояс, боковые и задние карманы. Свободный крой.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Серый', hex: '#808080' },
      { name: 'Хаки', hex: '#556B2F' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'Брюки',
    isNewProduct: true,
    isBestseller: true,
    images: [
      '/prod_assets/Брюки-джоггеры_1.jpg',
      '/prod_assets/Брюки-джоггеры_2.jpg',
      '/prod_assets/Брюки-джоггеры_3.jpg',
    ],
  },
  {
    name: 'Брюки классические',
    price: 3190,
    rating: 4.5,
    reviewCount: 39,
    description: 'Классические брюки прямого кроя. Стрелки, пояс со шлёвками, застёжка на молнию и крючок. Универсальная модель для офиса и повседневной носки.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Серый', hex: '#36454f' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Брюки',
    isNewProduct: false,
    isBestseller: false,
    images: [
      '/prod_assets/bruki_1.jpg',
      '/prod_assets/bruki_2.jpg',
      '/prod_assets/bruki_3.jpg',
    ],
  },
  {
    name: 'Блузка шёлковая',
    price: 2790,
    discountPrice: 2290,
    rating: 4.7,
    reviewCount: 45,
    description: 'Нежная шёлковая блузка. Отложной воротник, длинные рукава на манжетах. Подходит для деловых и романтичных образов.',
    colors: [
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Кремовый', hex: '#f5f5dc' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Блузки и рубашки',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/bluzka_1.jpg',
      '/prod_assets/bluzka_2.jpg',
      '/prod_assets/bluzka_3.jpg',
    ],
  },
  {
    name: 'Футболка оверсайз',
    price: 1690,
    rating: 4.4,
    reviewCount: 112,
    description: 'Модная футболка оверсайз. Спущенная линия плеча, широкий крой. Плотный хлопок, не просвечивает.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Серый меланж', hex: '#a9a9a9' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Топы и футболки',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/futbolka_1.jpg',
      '/prod_assets/futbolka_2.jpg',
      '/prod_assets/futbolka_3.jpg',
    ],
  },
];

async function seed() {
  await dbConnect();

  // Удаляем все индексы кроме _id
  try {
    const collection = mongoose.connection.db!.collection('products');
    await collection.dropIndexes();
    console.log('Indexes dropped');
  } catch (e) {
    console.log('No indexes to drop');
  }

  console.log(`Found ${await Product.countDocuments()} existing products`);

  // НЕ очищаем, а добавляем к существующим
  const result = await Product.insertMany(products);
  console.log(`Added ${result.length} new products`);
  console.log(`Total products: ${await Product.countDocuments()}`);

  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});