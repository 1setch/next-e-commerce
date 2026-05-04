// components/home/ProductSection/ProductSection.tsx

import Container from '@/components/layout/Container/Container';
import styles from './ProductSection.module.css';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import Button from '@/components/ui/Button/Button';
import { Product } from '@/lib/data/products';

interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection = ({ title, products }: ProductSectionProps) => {
    products = products.slice(0,4);
  return (
    <Container>
      <section className={styles.prod_section}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.prods}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              rating={String(product.rating)}
              price={String(product.discountPrice ?? product.price)}
              discountPrice={product.discountPrice}
              originalPrice={product.price}
              image={product.images[0]}
            />
          ))}
        </div>
        <Button variant="light" className={styles.btn}>
          View All
        </Button>
      </section>
    </Container>
  );
};

export default ProductSection;