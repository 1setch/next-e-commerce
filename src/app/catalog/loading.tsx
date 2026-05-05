// app/catalog/loading.tsx
import Container from '@/components/layout/Container/Container';
import Breadcrumbs from '@/components/catalog/Breadcrumbs/Breadcrumbs';
import ProductCardSkeleton from '@/components/product/ProductCard/ProductCardSkeleton';
import styles from './page.module.css';

export default function CatalogLoading() {
  return (
    <section>
      <Container>
        <Breadcrumbs items={[{ label: 'Каталог' }]} />
        
        <div className={styles.topBar}>
          <div style={{ width: '200px', height: '40px', background: 'var(--color-gray-100)', borderRadius: '8px' }} />
          <div style={{ width: '150px', height: '20px', background: 'var(--color-gray-100)', borderRadius: '8px' }} />
        </div>
        
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}