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

export const dynamic = 'force-dynamic';

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

    const toggleFilters = () => {
        const newState = !isMobileFilterOpen;
        setIsMobileFilterOpen(newState);
        if (newState) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const currentPage = Number(searchParams.get('page')) || 1;
    const totalPages = data?.totalPages || 1;
    const startItem = (currentPage - 1) * 9 + 1;
    const endItem = Math.min(currentPage * 9, data?.total || 0);
    const searchQuery = searchParams.get('search') || '';
    const currentCategory = searchParams.get('category') || '';

    if (isLoading) {
        return (
            <section>
                <Container>
                    <Breadcrumbs items={[{ label: 'Каталог' }]} />
                    <div className={styles.loading}>Loading...</div>
                </Container>
            </section>
        );
    }

    if (error) {
        return (
            <section>
                <Container>
                    <Breadcrumbs items={[{ label: 'Каталог' }]} />
                    <div className={styles.error}>Failed to load products</div>
                </Container>
            </section>
        );
    }

    return (
        <section>
            <Container>
                <Breadcrumbs
                    items={[
                        { label: 'Каталог', href: currentCategory ? '/catalog' : undefined },
                        ...(currentCategory ? [{ label: currentCategory }] : []),
                    ]}
                />

                <div className={styles.topBar}>
                    <h2 className={styles.title}>
                        {searchQuery ? `Search results for "${searchQuery}"` : 'Catalog'}
                    </h2>
                    <div className={styles.topRight}>
                        {searchParams.toString() && (
                            <Button
                                variant="ghost"
                                onClick={() => router.push('/catalog')}
                            >
                                Clear All Filters
                            </Button>
                        )}
                        <span className={styles.showing}>
                            Showing {startItem}-{endItem} of {data?.total} Products
                        </span>
                        <div className={styles.sortWrapper}>
                            <SortSelect />
                        </div>
                        <Button
                            variant="outline"
                            className={styles.filterBtn}
                            onClick={toggleFilters}
                        >
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 6V11.75C7.5 11.9489 7.42098 12.1397 7.28033 12.2803C7.13968 12.421 6.94891 12.5 6.75 12.5C6.55109 12.5 6.36032 12.421 6.21967 12.2803C6.07902 12.1397 6 11.9489 6 11.75V6C6 5.80109 6.07902 5.61032 6.21967 5.46967C6.36032 5.32902 6.55109 5.25 6.75 5.25C6.94891 5.25 7.13968 5.32902 7.28033 5.46967C7.42098 5.61032 7.5 5.80109 7.5 6ZM11.25 10.25C11.0511 10.25 10.8603 10.329 10.7197 10.4697C10.579 10.6103 10.5 10.8011 10.5 11V11.75C10.5 11.9489 10.579 12.1397 10.7197 12.2803C10.8603 12.421 11.0511 12.5 11.25 12.5C11.4489 12.5 11.6397 12.421 11.7803 12.2803C11.921 12.1397 12 11.9489 12 11.75V11C12 10.8011 11.921 10.6103 11.7803 10.4697C11.6397 10.329 11.4489 10.25 11.25 10.25ZM12.75 7.75H12V0.75C12 0.551088 11.921 0.360322 11.7803 0.21967C11.6397 0.0790177 11.4489 0 11.25 0C11.0511 0 10.8603 0.0790177 10.7197 0.21967C10.579 0.360322 10.5 0.551088 10.5 0.75V7.75H9.75C9.55109 7.75 9.36032 7.82902 9.21967 7.96967C9.07902 8.11032 9 8.30109 9 8.5C9 8.69891 9.07902 8.88968 9.21967 9.03033C9.36032 9.17098 9.55109 9.25 9.75 9.25H12.75C12.9489 9.25 13.1397 9.17098 13.2803 9.03033C13.421 8.88968 13.5 8.69891 13.5 8.5C13.5 8.30109 13.421 8.11032 13.2803 7.96967C13.1397 7.82902 12.9489 7.75 12.75 7.75ZM2.25 8.25C2.05109 8.25 1.86032 8.32902 1.71967 8.46967C1.57902 8.61032 1.5 8.80109 1.5 9V11.75C1.5 11.9489 1.57902 12.1397 1.71967 12.2803C1.86032 12.421 2.05109 12.5 2.25 12.5C2.44891 12.5 2.63968 12.421 2.78033 12.2803C2.92098 12.1397 3 11.9489 3 11.75V9C3 8.80109 2.92098 8.61032 2.78033 8.46967C2.63968 8.32902 2.44891 8.25 2.25 8.25ZM3.75 5.75H3V0.75C3 0.551088 2.92098 0.360322 2.78033 0.21967C2.63968 0.0790177 2.44891 0 2.25 0C2.05109 0 1.86032 0.0790177 1.71967 0.21967C1.57902 0.360322 1.5 0.551088 1.5 0.75V5.75H0.75C0.551088 5.75 0.360322 5.82902 0.21967 5.96967C0.0790177 6.11032 0 6.30109 0 6.5C0 6.69891 0.0790177 6.88968 0.21967 7.03033C0.360322 7.17098 0.551088 7.25 0.75 7.25H3.75C3.94891 7.25 4.13968 7.17098 4.28033 7.03033C4.42098 6.88968 4.5 6.69891 4.5 6.5C4.5 6.30109 4.42098 6.11032 4.28033 5.96967C4.13968 5.82902 3.94891 5.75 3.75 5.75ZM8.25 2.75H7.5V0.75C7.5 0.551088 7.42098 0.360322 7.28033 0.21967C7.13968 0.0790177 6.94891 0 6.75 0C6.55109 0 6.36032 0.0790177 6.21967 0.21967C6.07902 0.360322 6 0.551088 6 0.75V2.75H5.25C5.05109 2.75 4.86032 2.82902 4.71967 2.96967C4.57902 3.11032 4.5 3.30109 4.5 3.5C4.5 3.69891 4.57902 3.88968 4.71967 4.03033C4.86032 4.17098 5.05109 4.25 5.25 4.25H8.25C8.44891 4.25 8.63968 4.17098 8.78033 4.03033C8.92098 3.88968 9 3.69891 9 3.5C9 3.30109 8.92098 3.11032 8.78033 2.96967C8.63968 2.82902 8.44891 2.75 8.25 2.75Z" fill="black" />
                            </svg>

                        </Button>
                    </div>
                </div>

                <div className={styles.layout}>
                    <div
                        className={`${styles.mobileOverlay} ${isMobileFilterOpen ? styles.overlayOpen : ''}`}
                        onClick={toggleFilters}
                    />
                    <div
                        className={`${styles.sidebarWrapper} ${isMobileFilterOpen ? styles.sidebarOpen : ''}`}
                        onClick={toggleFilters} // клик по обёртке закрывает
                    >
                        {/* Останавливаем всплытие, чтобы клик по самому сайдбару не закрывал */}
                        <div onClick={(e) => e.stopPropagation()}>
                            <FiltersSidebar isOpen={isMobileFilterOpen} />
                        </div>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.grid}>
                            {data?.data.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    id={product._id.toString()}
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
        <Suspense fallback={<div>Loading...</div>}>
            <CatalogContent />
        </Suspense>
    );
}