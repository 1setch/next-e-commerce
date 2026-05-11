import Hero from "@/components/home/Hero/Hero";
import Partners from "@/components/home/Partners/Partners";
import ProductSection from "@/components/home/ProductSection/ProductSection";
import styles from "./page.module.css";
import dbConnect from '@/lib/db/mongoose';
import Product from '@/lib/db/models/Product';
import { Product as ProductType } from '@/lib/data/products';

//   Серверный компонент (работает ТОЛЬКО на сервере)
// Поэтому можно напрямую делать await dbConnect() и Product.find()
// В клиентских компонентах так нельзя - нужно через API

export default async function HomePage() {
  await dbConnect();
  
  //   .lean() возвращает обычные JS-объекты вместо Mongoose-документов
  // Это быстрее и экономит память, но теряет методы типа .save()
  // Для чтения идеально, для обновления не подходит
  
  //   Берем последние 20 новинок (сортируем по дате создания)
  const newProducts = await Product.find({ isNewProduct: true })
    .sort({ createdAt: -1 }) // -1 = по убыванию (сначала новые)
    .limit(20)
    .lean();
  
  //   Берем 20 товаров-хитов (можно отсортировать по рейтингу или продажам)
  const bestsellerProducts = await Product.find({ isBestseller: true })
    .sort({ rating: -1 }) // сначала с высоким рейтингом
    .limit(20)
    .lean();

  //   Трансформируем Mongoose _id (ObjectId) в строку
  // И нормализуем поля, которые могут отличаться от типа ProductType
  const transformProduct = (p: any): ProductType => ({
    ...p,
    _id: p._id.toString(),
    isNew: p.isNewProduct,
    isBestseller: p.isBestseller,
    createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : undefined,
  });

  const newArrivals = newProducts.map(transformProduct);
  const topSelling = bestsellerProducts.map(transformProduct);

  return (
    <div>
      <Hero />
      <Partners />
      <ProductSection 
        title="НОВИНКИ" 
        products={newArrivals} 
        linkHref="/catalog?isNew=true" 
      />
      <div className={styles.prod_hr} />
      <ProductSection 
        title="ТОП ПРОДАЖ" 
        products={topSelling} 
        linkHref="/catalog?sort=popular" 
      />
    </div>
  );
}