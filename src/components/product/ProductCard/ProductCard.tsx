// components/product/ProductCard/ProductCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import shirt from '@/../public/shirt.png';
import { getProductImage } from '@/lib/data/products';

interface ProductCardProps {
  id: number;
  name: string;
  rating: string;
  price: string;
  discountPrice?: number;
  originalPrice?: number;
  image?: string;
}

const ProductCard = ({
  id,
  name,
  rating,
  price,
  discountPrice,
  originalPrice,
  image,
}: ProductCardProps) => {
  const hasDiscount = !!discountPrice && discountPrice < (originalPrice ?? 0);
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice! - discountPrice) / originalPrice!) * 100)
    : 0;

  return (
    <Link href={`/product/${id}`} className={styles.card}>
      <div className={styles.img_wrap}>
        <Image
          src={image || getProductImage(id)}
          alt={name}
          className={styles.img}
          width={295}
          height={298}
        />
      </div>
      <span className={styles.title}>{name}</span>
      <div className={styles.rating}>
        ⭐ {rating}
      </div>
      <div className={styles.priceBlock}>
        <span className={styles.price}>${price}</span>
        {hasDiscount && (
          <>
            <span className={styles.originalPrice}>${originalPrice}</span>
            <span className={styles.discount}>-{discountPercent}%</span>
          </>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;