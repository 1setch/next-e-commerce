// app/product/[id]/loading.tsx
import Container from '@/components/layout/Container/Container';
import Breadcrumbs from '@/components/catalog/Breadcrumbs/Breadcrumbs';
import Skeleton from '@/components/ui/Skeleton/Skeleton';
import styles from './page.module.css';

export default function ProductLoading() {
  return (
    <section>
      <Container>
        <Breadcrumbs items={[{ label: 'Loading...' }]} />
        
        <div className={styles.product}>
          {/* Галерея */}
          <div style={{ display: 'flex', gap: '14px', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Skeleton width={152} height={167} />
              <Skeleton width={152} height={167} />
              <Skeleton width={152} height={167} />
            </div>
            <Skeleton width={444} height={530} />
          </div>
          
          {/* Инфо */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Skeleton width="80%" height="40px" />
            <Skeleton width="30%" height="20px" />
            <Skeleton width="40%" height="36px" />
            <Skeleton width="100%" height="80px" />
            <hr style={{ border: 'none', borderTop: '1px solid var(--color-gray-200)' }} />
            <Skeleton width="30%" height="20px" />
            <div style={{ display: 'flex', gap: '16px' }}>
              <Skeleton width={37} height={37} borderRadius="50%" />
              <Skeleton width={37} height={37} borderRadius="50%" />
              <Skeleton width={37} height={37} borderRadius="50%" />
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--color-gray-200)' }} />
            <Skeleton width="30%" height="20px" />
            <div style={{ display: 'flex', gap: '12px' }}>
              <Skeleton width={90} height={40} borderRadius="62px" />
              <Skeleton width={90} height={40} borderRadius="62px" />
              <Skeleton width={90} height={40} borderRadius="62px" />
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--color-gray-200)' }} />
            <div style={{ display: 'flex', gap: '20px' }}>
              <Skeleton width={170} height={52} borderRadius="62px" />
              <Skeleton width="100%" height={52} borderRadius="62px" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}