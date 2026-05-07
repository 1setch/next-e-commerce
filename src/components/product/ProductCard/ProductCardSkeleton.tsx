// components/product/ProductCard/ProductCardSkeleton.tsx
import Skeleton from '@/components/ui/Skeleton/Skeleton';
import styles from './ProductCard.module.css';

const ProductCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.img_wrap}>
        <Skeleton height={298} borderRadius="12px" />
      </div>
      <Skeleton width="70%" height="18px" />
      <Skeleton width="40%" height="16px" />
      <Skeleton width="50%" height="24px" />
    </div>
  );
};

export default ProductCardSkeleton;