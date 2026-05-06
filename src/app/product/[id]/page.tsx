import Container from '@/components/layout/Container/Container';
import ProductGallery from '@/components/product/ProductGallery/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo/ProductInfo';
import ProductTabs from '@/components/product/ProductTabs/ProductTabs';
import RecommendedProducts from '@/components/product/RecommendedProducts/RecommendedProducts';
import Breadcrumbs from '@/components/catalog/Breadcrumbs/Breadcrumbs';
import dbConnect from '@/lib/db/mongoose';
import Product from '@/lib/db/models/Product';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  await dbConnect();
  const product = await Product.findById(id).lean();

  if (!product) notFound();

  const p = {
    ...product,
    _id: String(product._id),
    colors: product.colors.map((c: any) => ({ name: c.name, hex: c.hex })),
    images: product.images || [],
  } as any;
  const actualPrice = p.discountPrice ?? p.price;

  return (
    <section>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Каталог', href: '/catalog' },
            { label: p.category, href: `/catalog?category=${p.category}` },
            { label: p.name },
          ]}
        />
        <div className={styles.product}>
          <ProductGallery images={p.images} name={p.name} />
          <ProductInfo
            id={p._id}
            name={p.name}
            rating={p.rating}
            reviewCount={p.reviewCount}
            price={actualPrice}
            discountPrice={p.discountPrice}
            originalPrice={p.price}
            description={p.description}
            colors={p.colors}
            sizes={p.sizes}
            image={p.images?.[0] || ''}
          />
        </div>
        <ProductTabs
          productId={p._id}
          description={p.description}
          rating={p.rating}
          reviewCount={p.reviewCount}
          details={p.details}
        />
        <RecommendedProducts category={p.category} currentProductId={p._id} />
      </Container>
    </section>
  );
}