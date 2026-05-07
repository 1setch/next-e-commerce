// app/catalog/loading.tsx
import Container from '@/components/layout/Container/Container';
import Breadcrumbs from '@/components/catalog/Breadcrumbs/Breadcrumbs';
import ProductCardSkeleton from '@/components/product/ProductCard/ProductCardSkeleton';
import styles from './page.module.css';
import SortSelect from '@/components/catalog/SortSelect/SortSelect';
import FiltersSidebar from '@/components/catalog/FiltersSidebar/FiltersSidebar';

export default function CatalogLoading() {
  return (
    <section>
      <Container>
        <Breadcrumbs items={[{ label: 'Каталог' }]} />

        <div className={styles.topBar}>
          <h2 className={styles.title}>
            Каталог
          </h2>
          <div className={styles.topRight}>
            <div className={styles.sortWrapper}>
              <SortSelect />
            </div>

          </div>
        </div>

        <div className={styles.layout}>

          <div
            className={`${styles.sidebarWrapper}`}
          >
            {/* Останавливаем всплытие, чтобы клик по самому сайдбару не закрывал */}
            <div>
              <FiltersSidebar />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.grid}>
              {Array.from({ length: 9 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}

{/* <section>
  <Container>
    <Breadcrumbs items={[{ label: 'Каталог' }]} />

    <div className={styles.topBar}>
      <div className={styles.topRight}>
        <div className={styles.sortWrapper}>
          <SortSelect />
        </div>

      </div>
    </div>

    <div className={styles.layout}>


      <div className={styles.content}>
        <div className={styles.grid}>
          {Array.from({ length: 9 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>

      </div>
    </div>
  </Container>
</section> */}