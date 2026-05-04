// app/catalog/page.tsx
'use client';

import { useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Container from '@/components/layout/Container/Container';
import Breadcrumbs from '@/components/catalog/Breadcrumbs/Breadcrumbs';
import FiltersSidebar from '@/components/catalog/FiltersSidebar/FiltersSidebar';
import SortSelect from '@/components/catalog/SortSelect/SortSelect';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import Pagination from '@/components/catalog/Pagination/Pagination';
import Button from '@/components/ui/Button/Button';
import { Product } from '@/lib/data/products';
import styles from './page.module.css';

interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  totalPages: number;
}

const fetchProducts = async (searchParams: URLSearchParams): Promise<ProductsResponse> => {
  const res = await fetch(`/api/products?${searchParams.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', searchParams.toString()],
    queryFn: () => fetchProducts(searchParams),
    placeholderData: (previousData) => previousData,
  });

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      if (key !== 'page') params.set('page', '1');
      router.push(`/catalog?${params.toString()}`);
    },
    [router, searchParams]
  );

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = data?.totalPages || 1;
  const startItem = (currentPage - 1) * 9 + 1;
  const endItem = Math.min(currentPage * 9, data?.total || 0);
  const searchQuery = searchParams.get('search') || '';

  if (isLoading) {
    return (
      <section>
        <Container>
          <Breadcrumbs items={[{ label: 'Catalog' }]} />
          <div className={styles.loading}>Loading...</div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <Container>
          <Breadcrumbs items={[{ label: 'Catalog' }]} />
          <div className={styles.error}>Failed to load products</div>
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Container>
        <Breadcrumbs items={[{ label: 'Catalog' }]} />

        <div className={styles.topBar}>
          <h2 className={styles.title}>
            {searchQuery ? `Search results for "${searchQuery}"` : 'Catalog'}
          </h2>
          <div className={styles.topRight}>
            <span className={styles.showing}>
              Showing {startItem}-{endItem} of {data?.total} Products
            </span>
            <div className={styles.sortWrapper}>
              <SortSelect />
            </div>
            <Button
              variant="outline"
              className={styles.filterBtn}
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 7H21M3 12H21M3 17H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Filters
            </Button>
          </div>
        </div>

        <div className={styles.layout}>
          <div
            className={`${styles.mobileOverlay} ${isMobileFilterOpen ? styles.overlayOpen : ''}`}
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className={`${styles.sidebarWrapper} ${isMobileFilterOpen ? styles.sidebarOpen : ''}`}>
            <FiltersSidebar />
          </div>

          <div className={styles.content}>
            <div className={styles.grid}>
              {data?.data.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  rating={String(product.rating)}
                  price={String(product.discountPrice ?? product.price)}
                  discountPrice={product.discountPrice}
                  originalPrice={product.price}
                  image={product.images?.[0]}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => updateParams('page', String(page))}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <section>
          <Container>
            <Breadcrumbs items={[{ label: 'Catalog' }]} />
            <div className={styles.loading}>Loading...</div>
          </Container>
        </section>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}