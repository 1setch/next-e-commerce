// components/home/ProductSection/ProductSection.tsx

import Link from 'next/link';
import Container from '@/components/layout/Container/Container';
import styles from './ProductSection.module.css';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import Button from '@/components/ui/Button/Button';
import { Product } from '@/lib/data/products';

interface ProductSectionProps {
  title: string;
  products: Product[];
  linkHref?: string;
}

const ProductSection = ({ title, products, linkHref }: ProductSectionProps) => {
  return (
    <Container>
      <section className={styles.prod_section}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.prods}>
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              rating={String(product.rating)}
              price={String(
                product.discountPrice && product.discountPrice > 0
                  ? product.discountPrice
                  : product.price
              )}
              discountPrice={product.discountPrice}
              originalPrice={product.price}
              image={product.images?.[0]}
            />
          ))}
        </div>
        {linkHref && (
          <Link href={linkHref}>
            <Button variant="light" className={styles.btn}>
              Смотреть все
            </Button>
          </Link>
        )}
      </section>
    </Container>
  );
};

export default ProductSection;