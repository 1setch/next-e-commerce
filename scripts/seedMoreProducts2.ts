// scripts/seedMoreProducts2.ts
import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(process.cwd(), '.env.local') });

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
    name: 'Лонгслив с высоким воротником',
    price: 1890,
    discountPrice: 1490,
    rating: 5,
    reviewCount: 0,
    description: 'Облегающий лонгслив с воротником-гольф из микродайвинга. Тянется во все стороны, сохраняет тепло.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Коричневый', hex: '#8b4513' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Топы и футболки',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/Платье красное_3.jpg',
      '/prod_assets/Платье красное_1.jpg',
      '/prod_assets/Платье красное_2.jpg',
    ],
  },
  {
    name: 'Майка в рубчик',
    price: 990,
    rating: 5,
    reviewCount: 0,
    description: 'Приталенная майка из хлопкового риба. Тонкие бретели, глубокий круглый вырез. Отличный поддев или самостоятельный летний вариант.',
    colors: [
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Бежевый', hex: '#d4c4a8' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Топы и футболки',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/Топ из рибового полотна_3.jpg',
      '/prod_assets/Топ из рибового полотна_1.jpg',
      '/prod_assets/Топ из рибового полотна_2.jpg',
    ],
  },
  {
    name: 'Футболка свободного кроя с карманом',
    price: 1490,
    rating: 5,
    reviewCount: 0,
    description: 'Просторная футболка из 100% органического хлопка. Нагрудный карман, спущенная линия плеча.',
    colors: [
      { name: 'Серый меланж', hex: '#a9a9a9' },
      { name: 'Голубой', hex: '#add8e6' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'Топы и футболки',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/Футболка с принтом_3.jpg',
      '/prod_assets/Футболка с принтом_1.jpg',
      '/prod_assets/Футболка с принтом_2.jpg',
    ],
  },
  {
    name: 'Боди с длинным рукавом',
    price: 2190,
    rating: 5,
    reviewCount: 0,
    description: 'Элегантное боди из гладкого трикотажа. Застёжка на кнопках снизу, облегающий силуэт без складок.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Белый', hex: '#FFFFFF' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Топы и футболки',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/Блузка с воланами_3.jpg',
      '/prod_assets/Блузка с воланами_1.jpg',
      '/prod_assets/Блузка с воланами_2.jpg',
    ],
  },
  {
    name: 'Футболка-поло с контрастным воротником',
    price: 2790,
    discountPrice: 2190,
    rating: 5,
    reviewCount: 0,
    description: 'Современное поло из пике с контрастным белым воротником. Короткая застёжка на двух пуговицах, боковые разрезы.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Красный', hex: '#C41E3A' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Топы и футболки',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/bluzka_3.jpg',
      '/prod_assets/bluzka_1.jpg',
      '/prod_assets/bluzka_2.jpg',
    ],
  },
  {
    name: 'Рубашка с воротником-стойкой',
    price: 3290,
    discountPrice: 2590,
    rating: 5,
    reviewCount: 0,
    description: 'Минималистичная рубашка без воротника со стойкой. Потайная планка на пуговицах, слегка удлинённая спинка.',
    colors: [
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Голубой', hex: '#add8e6' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Блузки и рубашки',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/Трикотажное платье из рибового полотна с завязками_3.jpg',
      '/prod_assets/Трикотажное платье из рибового полотна с завязками_1.jpg',
      '/prod_assets/Трикотажное платье из рибового полотна с завязками_2.jpg',
    ],
  },
  {
    name: 'Блузка с жабо',
    price: 3490,
    rating: 5,
    reviewCount: 0,
    description: 'Романтичная блузка с пышным жабо из шифона. Облегающий крой, длинные рукава на пуговицах. Винтажный шарм.',
    colors: [
      { name: 'Молочный', hex: '#e9f5f5' },
      { name: 'Чёрный', hex: '#000000' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Блузки и рубашки',
    isNewProduct: true,
    isBestseller: true,
    images: [
      '/prod_assets/Толстовка с капюшоном из велюра_3.jpg',
      '/prod_assets/Толстовка с капюшоном из велюра_1.jpg',
      '/prod_assets/Толстовка с капюшоном из велюра_2.jpg',
    ],
  },
  {
    name: 'Льняная рубашка прямого кроя',
    price: 2890,
    rating: 5,
    reviewCount: 0,
    description: 'Дышащая рубашка из 100% льна. Классический воротник, нагрудный карман. Мнётся благородно.',
    colors: [
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Бежевый', hex: '#d4c4a8' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Блузки и рубашки',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/Шорты с подворотами_3.jpg',
      '/prod_assets/Шорты с подворотами_1.jpg',
      '/prod_assets/Шорты с подворотами_2.jpg',
    ],
  },
  {
    name: 'Палаццо с разрезом',
    price: 3290,
    discountPrice: 2590,
    rating: 5,
    reviewCount: 0,
    description: 'Широкие брюки-палаццо из струящейся вискозы. Высокая посадка, передние разрезы, летящий силуэт.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Брюки',
    isNewProduct: true,
    isBestseller: true,
    images: [
      '/prod_assets/bruki_3.jpg',
      '/prod_assets/bruki_1.jpg',
      '/prod_assets/bruki_2.jpg',
    ],
  },
  {
    name: 'Брюки-бананы',
    price: 2690,
    rating: 5,
    reviewCount: 0,
    description: 'Модные брюки-бананы с завышенной талией. Широкие в бёдрах, зауженные книзу. Защипы спереди, боковые карманы.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Хаки', hex: '#556B2F' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Брюки',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/Брюки-джоггеры_3.jpg',
      '/prod_assets/Брюки-джоггеры_1.jpg',
      '/prod_assets/Брюки-джоггеры_2.jpg',
    ],
  },
  {
    name: 'Легинсы с лаковым покрытием',
    price: 2490,
    discountPrice: 1890,
    rating: 5,
    reviewCount: 0,
    description: 'Эффектные легинсы с глянцевым покрытием. Высокая посадка, утягивающий эффект, плоские швы.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Брюки',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/futbolka_3.jpg',
      '/prod_assets/futbolka_1.jpg',
      '/prod_assets/futbolka_2.jpg',
    ],
  },
  {
    name: 'Кожаные шорты',
    price: 3990,
    discountPrice: 3190,
    rating: 5,
    reviewCount: 0,
    description: 'Шорты из мягкой экокожи. Высокая талия, пояс со шлёвками, карманы. Смелый акцент для вечернего выхода.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Шорты',
    isNewProduct: false,
    isBestseller: false,
    images: [
      '/prod_assets/Трикотажное платье из рибового полотна с завязками_3.jpg',
      '/prod_assets/Трикотажное платье из рибового полотна с завязками_1.jpg',
      '/prod_assets/Трикотажное платье из рибового полотна с завязками_2.jpg',
    ],
  },
  {
    name: 'Платье-сарафан на пуговицах',
    price: 3490,
    discountPrice: 2790,
    rating: 5,
    reviewCount: 0,
    description: 'Платье-сарафан из денима. Ряд пуговиц спереди, тонкие бретели, карманы. Носите с футболкой или без.',
    colors: [
      { name: 'Голубой', hex: '#add8e6' },
      { name: 'Dark Wash', hex: '#1c3a5e' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Платья',
    isNewProduct: true,
    isBestseller: true,
    images: [
      '/prod_assets/Платье красное_3.jpg',
      '/prod_assets/Платье красное_1.jpg',
      '/prod_assets/Платье красное_2.jpg',
    ],
  },
  {
    name: 'Тёплое платье-свитер',
    price: 4190,
    rating: 5,
    reviewCount: 0,
    description: 'Уютное вязаное платье крупной вязки. Воротник-хомут, удлинённые рукава, разрезы по бокам. Для холодных дней.',
    colors: [
      { name: 'Кремовый', hex: '#f5f5dc' },
      { name: 'Чёрный', hex: '#000000' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Платья',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/Толстовка с капюшоном из велюра_3.jpg',
      '/prod_assets/Толстовка с капюшоном из велюра_1.jpg',
      '/prod_assets/Толстовка с капюшоном из велюра_2.jpg',
    ],
  },
  {
    name: 'Леггинсы спортивные с карманами',
    price: 2290,
    rating: 5,
    reviewCount: 0,
    description: 'Спортивные леггинсы с двумя карманами по бокам для телефона. Высокая талия, влагоотводящая ткань.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Хаки', hex: '#556B2F' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Брюки',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/Шорты с подворотами_3.jpg',
      '/prod_assets/Шорты с подворотами_1.jpg',
      '/prod_assets/Шорты с подворотами_2.jpg',
    ],
  },
  {
    name: 'Жилет стёганый',
    price: 2990,
    rating: 5,
    reviewCount: 0,
    description: 'Укороченный стёганый жилет на синтепоне. Застёжка на пуговицах, V-образный вырез. Отличный дополнительный слой.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Бежевый', hex: '#d4c4a8' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Кофты и толстовки',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/Брюки-джоггеры_3.jpg',
      '/prod_assets/Брюки-джоггеры_1.jpg',
      '/prod_assets/Брюки-джоггеры_2.jpg',
    ],
  },
  {
    name: 'Худи с капюшоном на молнии',
    price: 3490,
    discountPrice: 2690,
    rating: 5,
    reviewCount: 0,
    description: 'Классическое худи на молнии с капюшоном. Два передних кармана, регулируемый капюшон, мягкий футер.',
    colors: [
      { name: 'Серый меланж', hex: '#a9a9a9' },
      { name: 'Чёрный', hex: '#000000' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'Кофты и толстовки',
    isNewProduct: true,
    isBestseller: true,
    images: [
      '/prod_assets/Топ из рибового полотна_3.jpg',
      '/prod_assets/Топ из рибового полотна_1.jpg',
      '/prod_assets/Топ из рибового полотна_2.jpg',
    ],
  },
  {
    name: 'Юбка-карандаш из экокожи',
    price: 3190,
    rating: 5,
    reviewCount: 0,
    description: 'Облегающая юбка-карандаш из мягкой экокожи. Высокая посадка, потайная молния сзади, разрез. Дерзко и элегантно.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Платья',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/bluzka_3.jpg',
      '/prod_assets/bluzka_1.jpg',
      '/prod_assets/bluzka_2.jpg',
    ],
  },
  {
    name: 'Рубашка из денима с вышивкой',
    price: 3690,
    discountPrice: 2890,
    rating: 5,
    reviewCount: 0,
    description: 'Джинсовая рубашка с машинной вышивкой на спине. Оверсайз крой, нагрудные карманы.',
    colors: [
      { name: 'Голубой', hex: '#add8e6' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Блузки и рубашки',
    isNewProduct: true,
    isBestseller: false,
    images: [
      '/prod_assets/Футболка с принтом_3.jpg',
      '/prod_assets/Футболка с принтом_1.jpg',
      '/prod_assets/Футболка с принтом_2.jpg',
    ],
  },
  {
    name: 'Шорты-велосипедки',
    price: 1590,
    rating: 5,
    reviewCount: 0,
    description: 'Облегающие шорты-велосипедки из плотного трикотажа. Высокая талия, не просвечивают. Для спорта и повседневной носки.',
    colors: [
      { name: 'Чёрный', hex: '#000000' },
      { name: 'Белый', hex: '#FFFFFF' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Шорты',
    isNewProduct: false,
    isBestseller: true,
    images: [
      '/prod_assets/bruki_3.jpg',
      '/prod_assets/bruki_1.jpg',
      '/prod_assets/bruki_2.jpg',
    ],
  },
];

async function seed() {
  await dbConnect();

  console.log(`Found ${await Product.countDocuments()} existing products`);

  const result = await Product.insertMany(products);
  console.log(`Added ${result.length} new products`);
  console.log(`Total products: ${await Product.countDocuments()}`);

  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});