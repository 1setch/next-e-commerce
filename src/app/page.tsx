import Hero from "@/components/home/Hero/Hero";
import styles from "./page.module.css";
import Partners from "@/components/home/Partners/Partners";
import ProductSection from "@/components/home/ProductSection/ProductSection";


export default function HomePage() {
  return (
    <div>
      <Hero/>
      <Partners/>
      <ProductSection title="NEW ARRIVALS"/>
      <div className={styles.prod_hr} />
      <ProductSection title="TOP SELLING"/>
    </div>
  );
}
