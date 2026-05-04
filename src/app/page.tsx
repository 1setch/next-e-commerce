import Hero from "@/components/home/Hero/Hero";
import Partners from "@/components/home/Partners/Partners";
import ProductSection from "@/components/home/ProductSection/ProductSection";
import styles from "./page.module.css";
import dbConnect from '@/lib/db/mongoose';
import Product from '@/lib/db/models/Product';
import { Product as ProductType } from '@/lib/data/products';

export default async function HomePage() {
  await dbConnect();
  const products = await Product.find({}).lean();

  const all: ProductType[] = products.map((p: any) => ({
    ...p,
    _id: String(p._id),
    isNew: p.isNewProduct,
    createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : undefined,
  })) as unknown as ProductType[];

  const newArrivals = all.filter((p) => p.isNew);
  const topSelling = all.filter((p) => p.isBestseller);

  return (
    <div>
      <Hero />
      <Partners />
      <ProductSection title="NEW ARRIVALS" products={newArrivals} linkHref="/catalog?isNew=true" />
      <div className={styles.prod_hr} />
      <ProductSection title="TOP SELLING" products={topSelling} linkHref="/catalog?sort=popular" />
    </div>
  );
}