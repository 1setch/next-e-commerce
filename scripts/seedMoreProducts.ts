// scripts/seedMoreProducts.ts
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
  // ===== ТОПЫ И ФУТБОЛКИ =====
  {
    name: 'Базовый лонгслив с круглым вырезом',
    price: 1690,
    rating: 5,
    reviewCount: 0,
    description: 'Универсальный лонгслив из плотного хлопка. Идеально сидит по фигуре, не растягивается после стирки. Отложной воротник и манжеты на резинке.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Белый', hex: '#FFFFFF' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Топы и футболки',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/Платье красное_2.jpg',
      '/prod_assets/Платье красное_3.jpg',
      '/prod_assets/Платье красное_1.jpg',
    ],
  },
  {
    name: 'Футболка с v-образным вырезом',
    price: 1290,
    rating: 5,
    reviewCount: 0,
    description: 'Лёгкая футболка с глубоким V-вырезом. Мягкий трикотаж, свободный крой. Отлично сочетается с джинсами и юбками.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Серый', hex: '#808080' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Топы и футболки',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/Топ из рибового полотна_2.jpg',
      '/prod_assets/Топ из рибового полотна_3.jpg',
      '/prod_assets/Топ из рибового полотна_1.jpg',
    ],
  },
  {
    name: 'Спортивный топ с логотипом',
    price: 2190,
    discountPrice: 1790,
    rating: 5,
    reviewCount: 0,
    description: 'Облегающий спортивный топ из эластичной ткани. Вышитый логотип спереди, двойная строчка для надёжности. Подходит для фитнеса и повседневной носки.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Белый', hex: '#FFFFFF' },
    ],
    sizes: ['S', 'M', 'L'],
    category: 'Топы и футболки',
    isNewProduct: true,
    isBestseller: true,
    images: [
      '/prod_assets/Футболка с принтом_2.jpg',
      '/prod_assets/Футболка с принтом_3.jpg',
      '/prod_assets/Футболка с принтом_1.jpg',
    ],
  },
  {
    name: 'Топ на бретелях из сатина',
    price: 1490,
    rating: 5,
    reviewCount: 0,
    description: 'Нежный топ на тонких бретелях из гладкого сатина. Идеален под жакет или для вечернего образа. Регулируемые бретели.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Кремовый', hex: '#f5f5dc' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Топы и футболки',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/Блузка с воланами_2.jpg',
      '/prod_assets/Блузка с воланами_3.jpg',
      '/prod_assets/Блузка с воланами_1.jpg',
    ],
  },
  {
    name: 'Поло из пике',
    price: 2490,
    discountPrice: 1990,
    rating: 5,
    reviewCount: 0,
    description: 'Классическое поло из хлопкового пике. Воротник-стойка, планка на двух пуговицах, вышитый логотип. Идеально для smart casual.',
    colors: [
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Голубой', hex: '#add8e6' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'Топы и футболки',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/bluzka_2.jpg',
      '/prod_assets/bluzka_3.jpg',
      '/prod_assets/bluzka_1.jpg',
    ],
  },

  // ===== БЛУЗКИ И РУБАШКИ =====
  {
    name: 'Рубашка в клетку oversize',
    price: 2790,
    rating: 5,
    reviewCount: 0,
    description: 'Свободная рубашка в крупную клетку. Нагрудный карман, закруглённый низ. Носите навыпуск или заправленной.',
    colors: [
      { name: 'Красный', hex: '#C41E3A' },
      { name: 'Хаки', hex: '#556B2F' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Блузки и рубашки',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/Трикотажное платье из рибового полотна с завязками_2.jpg',
      '/prod_assets/Трикотажное платье из рибового полотна с завязками_3.jpg',
      '/prod_assets/Трикотажное платье из рибового полотна с завязками_1.jpg',
    ],
  },
  {
    name: 'Блузка из шёлка с бантом',
    price: 3490,
    discountPrice: 2890,
    rating: 5,
    reviewCount: 0,
    description: 'Элегантная блузка из натурального шёлка. Завязывающийся бант на шее, длинные рукава на манжетах. Для офиса и торжественных мероприятий.',
    colors: [
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Кремовый', hex: '#f5f5dc' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Блузки и рубашки',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/Толстовка с капюшоном из велюра_2.jpg',
      '/prod_assets/Толстовка с капюшоном из велюра_3.jpg',
      '/prod_assets/Толстовка с капюшоном из велюра_1.jpg',
    ],
  },
  {
    name: 'Джинсовая рубашка',
    price: 2990,
    rating: 5,
    reviewCount: 0,
    description: 'Классическая джинсовая рубашка прямого кроя. Два нагрудных кармана, металлические кнопки. Прекрасно сочетается с брюками и юбками.',
    colors: [
      { name: 'Голубой', hex: '#add8e6' },
      { name: 'Dark Wash', hex: '#1c3a5e' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Блузки и рубашки',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/Шорты с подворотами_2.jpg',
      '/prod_assets/Шорты с подворотами_3.jpg',
      '/prod_assets/Шорты с подворотами_1.jpg',
    ],
  },

  // ===== ПЛАТЬЯ =====
  {
    name: 'Вечернее платье с пайетками',
    price: 5990,
    discountPrice: 4490,
    rating: 5,
    reviewCount: 0,
    description: 'Ослепительное платье расшитое пайетками. Облегающий силуэт, глубокое декольте, открытая спина. Для особых случаев.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Платья',
    isNewProduct: true,
    isBestseller: true,
    images: [
      '/prod_assets/Брюки-джоггеры_2.jpg',
      '/prod_assets/Брюки-джоггеры_3.jpg',
      '/prod_assets/Брюки-джоггеры_1.jpg',
    ],
  },
  {
    name: 'Платье-футляр с поясом',
    price: 3290,
    rating: 5,
    reviewCount: 0,
    description: 'Элегантное платье-футляр из плотного крепа. Съёмный пояс подчёркивает талию, потайная молния сзади. Идеально для офиса.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Бежевый', hex: '#d4c4a8' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Платья',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/bruki_2.jpg',
      '/prod_assets/bruki_3.jpg',
      '/prod_assets/bruki_1.jpg',
    ],
  },
  {
    name: 'Летнее платье в горох',
    price: 2590,
    discountPrice: 1990,
    rating: 5,
    reviewCount: 0,
    description: 'Лёгкое платье из вискозы с принтом в горох. Расклешённая юбка, пояс на резинке, карманы в боковых швах. Для прогулок и отпуска.',
    colors: [
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Красный', hex: '#C41E3A' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Платья',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/futbolka_2.jpg',
      '/prod_assets/futbolka_3.jpg',
      '/prod_assets/futbolka_1.jpg',
    ],
  },

  // ===== БРЮКИ =====
  {
    name: 'Классические брюки со стрелками',
    price: 3190,
    rating: 5,
    reviewCount: 0,
    description: 'Брюки прямого кроя со стрелками из габардина. Пояс со шлёвками, застёжка на молнию и крючок. Не мнутся, держат форму.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Серый', hex: '#36454f' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Брюки',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/Топ из рибового полотна_1.jpg',
      '/prod_assets/Топ из рибового полотна_2.jpg',
      '/prod_assets/Топ из рибового полотна_3.jpg',
    ],
  },
  {
    name: 'Кюлоты из крепа',
    price: 2890,
    discountPrice: 2290,
    rating: 5,
    reviewCount: 0,
    description: 'Широкие укороченные брюки из струящегося крепа. Высокая посадка, скрытая молния сбоку. Элегантно и удобно.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Брюки',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/Блузка с воланами_1.jpg',
      '/prod_assets/Блузка с воланами_2.jpg',
      '/prod_assets/Блузка с воланами_3.jpg',
    ],
  },
  {
    name: 'Утеплённые брюки-карго',
    price: 3690,
    rating: 5,
    reviewCount: 0,
    description: 'Тёплые брюки-карго с начёсом. Шесть карманов, усиленные колени, эластичный пояс. Для холодной погоды и активного отдыха.',
    colors: [
      { name: 'Хаки', hex: '#556B2F' },
      { name: 'Чёрный', hex: '#000000' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'Брюки',
    isNewProduct: true,
    isBestseller: true,
    images: [
      '/prod_assets/Платье красное_1.jpg',
      '/prod_assets/Платье красное_2.jpg',
      '/prod_assets/Платье красное_3.jpg',
    ],
  },

  // ===== ШОРТЫ =====
  {
    name: 'Джинсовые шорты с бахромой',
    price: 2290,
    discountPrice: 1890,
    rating: 5,
    reviewCount: 0,
    description: 'Шорты из денима с необработанным краем. Высокая посадка, пять карманов, потёртости для винтажного эффекта.',
    colors: [
      { name: 'Голубой', hex: '#add8e6' },
      { name: 'Dark Wash', hex: '#1c3a5e' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Шорты',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/Трикотажное платье из рибового полотна с завязками_1.jpg',
      '/prod_assets/Трикотажное платье из рибового полотна с завязками_2.jpg',
      '/prod_assets/Трикотажное платье из рибового полотна с завязками_3.jpg',
    ],
  },
  {
    name: 'Спортивные шорты из неопрена',
    price: 2590,
    discountPrice: 1990,
    rating: 5,
    reviewCount: 0,
    description: 'Шорты из неопрена с компрессионным эффектом. Высокая талия, плоские швы, быстро сохнут. Для фитнеса и бега.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
    ],
    sizes: ['S', 'M', 'L'],
    category: 'Шорты',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/Толстовка с капюшоном из велюра_1.jpg',
      '/prod_assets/Толстовка с капюшоном из велюра_2.jpg',
      '/prod_assets/Толстовка с капюшоном из велюра_3.jpg',
    ],
  },

  // ===== КОФТЫ И ТОЛСТОВКИ =====
  {
    name: 'Кардиган из мохера',
    price: 4290,
    rating: 5,
    reviewCount: 0,
    description: 'Уютный кардиган из пушистого мохера. Свободный крой, длинные рукава, застёжка на одну пуговицу. Накиньте поверх платья или джинсов.',
    colors: [
      { name: 'Кремовый', hex: '#f5f5dc' },
      { name: 'Чёрный', hex: '#000000' },
    ],
    sizes: ['S', 'M', 'L'],
    category: 'Кофты и толстовки',
    isNewProduct: true,
    isBestseller: true,
    images: [
      '/prod_assets/Шорты с подворотами_1.jpg',
      '/prod_assets/Шорты с подворотами_2.jpg',
      '/prod_assets/Шорты с подворотами_3.jpg',
    ],
  },
  {
    name: 'Свитшот с вышивкой',
    price: 2690,
    discountPrice: 2090,
    rating: 5,
    reviewCount: 0,
    description: 'Плотный свитшот из футера с машинной вышивкой на груди. Круглый вырез, спущенное плечо, манжеты и низ на резинке.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Серый меланж', hex: '#a9a9a9' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Кофты и толстовки',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/Брюки-джоггеры_1.jpg',
      '/prod_assets/Брюки-джоггеры_2.jpg',
      '/prod_assets/Брюки-джоггеры_3.jpg',
    ],
  },
  {
    name: 'Оверсайз джемпер',
    price: 3190,
    rating: 5,
    reviewCount: 0,
    description: 'Объёмный джемпер крупной вязки. Горловина-хомут, удлинённая спинка с разрезами по бокам. Тепло, стильно, уютно.',
    colors: [
      { name: 'Бежевый', hex: '#d4c4a8' },
      { name: 'Чёрный', hex: '#000000' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Кофты и толстовки',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/bruki_1.jpg',
      '/prod_assets/bruki_2.jpg',
      '/prod_assets/bruki_3.jpg',
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

  // Очистить существующие
  await Product.deleteMany({});
  console.log('Collection cleared');

  // Загрузить новые
  const result = await Product.insertMany(products);
  console.log(`Loaded ${result.length} products`);

  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});