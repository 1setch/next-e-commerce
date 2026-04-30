// app/catalog/page.tsx
'use client';
import { useState } from 'react';
import Container from '@/components/layout/Container/Container';
import Breadcrumbs from '@/components/catalog/Breadcrumbs/Breadcrumbs';
import FiltersSidebar from '@/components/catalog/FiltersSidebar/FiltersSidebar';
import SortSelect from '@/components/catalog/SortSelect/SortSelect';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import Pagination from '@/components/catalog/Pagination/Pagination';
import Button from '@/components/ui/Button/Button';
import styles from './page.module.css';

const CatalogPage = () => {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    return (
        <section>
            <Container>
                <Breadcrumbs />
                
                {/* Заголовок и сортировка */}
                <div className={styles.topBar}>
                    <h2 className={styles.title}>Casual</h2>
                    <div className={styles.topRight}>
                        <span className={styles.showing}>Showing 1-10 of 100 Products</span>
                        <div className={styles.sortWrapper}>
                            <SortSelect />
                        </div>
                        <Button 
                            variant="outline" 
                            className={styles.filterBtn}
                            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M3 7H21M3 12H21M3 17H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            Filters
                        </Button>
                    </div>
                </div>
                
                <div className={styles.layout}>
                    {/* Мобильная кнопка закрыть фильтры */}
                    <div className={`${styles.mobileOverlay} ${isMobileFilterOpen ? styles.overlayOpen : ''}`} 
                        onClick={() => setIsMobileFilterOpen(false)} 
                    />
                    <div className={`${styles.sidebarWrapper} ${isMobileFilterOpen ? styles.sidebarOpen : ''}`}>
                        <FiltersSidebar />
                    </div>
                    
                    <div className={styles.content}>
                        <div className={styles.grid}>
                            <ProductCard id={1} name="T-SHIRT WITH TAPE DETAILS" rating="4.5/5" price="120" />
                            <ProductCard id={2} name="SKINNY FIT JEANS" rating="3.5/5" price="240" />
                            <ProductCard id={3} name="CHECKERED SHIRT" rating="4.5/5" price="180" />
                            <ProductCard id={4} name="SLEEVE STRIPED T-SHIRT" rating="4.5/5" price="130" />
                            <ProductCard id={5} name="VERTICAL STRIPED SHIRT" rating="5.0/5" price="212" />
                            <ProductCard id={6} name="COURAGE GRAPHIC T-SHIRT" rating="4.0/5" price="145" />
                            <ProductCard id={7} name="LOOSE FIT BERMUDA SHORTS" rating="3.0/5" price="80" />
                            <ProductCard id={8} name="FADED SKINNY JEANS" rating="4.5/5" price="210" />
                            <ProductCard id={9} name="LOOSE FIT BERMUDA SHORTS" rating="4.0/5" price="160" />
                        </div>
                        <Pagination currentPage={1} totalPages={10} />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default CatalogPage;