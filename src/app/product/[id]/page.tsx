// app/product/[id]/page.tsx

import Container from '@/components/layout/Container/Container';
import ProductGallery from '@/components/product/ProductGallery/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo/ProductInfo';
import { mockProducts } from '@/lib/data/products';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Breadcrumbs from '@/components/catalog/Breadcrumbs/Breadcrumbs';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = mockProducts.find((p) => p.id === Number(id));

  if (!product) {
    notFound();
  }

  const actualPrice = product.discountPrice ?? product.price;

  return (
    <section>
      
      <Container>
        <Breadcrumbs />
        <div className={styles.product}>
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo
            id={product.id}
            name={product.name}
            rating={product.rating}
            reviewCount={product.reviewCount}
            price={actualPrice}
            discountPrice={product.discountPrice}
            originalPrice={product.price}
            description={product.description}
            colors={product.colors}
            sizes={product.sizes}
          />
        </div>
        <div></div>  {/* второй блок — потом */}
        <div></div>  {/* рекомендованные — потом */}
      </Container>
    </section>
  );
}