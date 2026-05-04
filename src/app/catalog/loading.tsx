// app/catalog/loading.tsx
import Container from '@/components/layout/Container/Container';
import Breadcrumbs from '@/components/catalog/Breadcrumbs/Breadcrumbs';

export default function CatalogLoading() {
  return (
    <section>
      <Container>
        <Breadcrumbs items={[{ label: 'Catalog' }]} />
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          Loading...
        </div>
      </Container>
    </section>
  );
}