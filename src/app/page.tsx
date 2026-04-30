// app/page.tsx

import Hero from "@/components/home/Hero/Hero";
import Partners from "@/components/home/Partners/Partners";
import ProductSection from "@/components/home/ProductSection/ProductSection";
import { mockProducts } from "@/lib/data/products";
import styles from "./page.module.css";

export default function HomePage() {
  const newArrivals = mockProducts.filter((p) => p.isNew);
  const topSelling = mockProducts.filter((p) => p.isBestseller);

  return (
    <div>
      <Hero />
      <Partners />
      <ProductSection title="NEW ARRIVALS" products={newArrivals} />
      <div className={styles.prod_hr} />
      <ProductSection title="TOP SELLING" products={topSelling} />
    </div>
  );
}