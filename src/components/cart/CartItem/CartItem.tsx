// components/cart/CartItem/CartItem.tsx
'use client';

import Image from 'next/image';
import QuantitySelector from '@/components/ui/QuantitySelector/QuantitySelector';
import { useCartStore } from '@/store/cartStore';
import styles from './CartItem.module.css';
import shirt from '@/../public/shirt.png';

interface CartItemProps {
  id: string;
  name: string;
  size: string;
  color: string;
  colorHex: string;
  price: number;
  image?: string;
  quantity: number;
}

const CartItem = ({ id, name, size, color, colorHex, price, image, quantity }: CartItemProps) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className={styles.item}>
      <div className={styles.imageWrap}>
        <Image
          src={image || shirt.src}
          alt={name}
          className={styles.image}
          width={124}
          height={124}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.top}>
          <div className={styles.details}>
            <h4 className={styles.name}>{name}</h4>
            <span className={styles.size}>Size: {size}</span>
            <span className={styles.color}>
              Color:{' '}
              <span className={styles.colorDot} style={{ backgroundColor: colorHex }} />
              {color}
            </span>
          </div>
          <button
            className={styles.removeBtn}
            onClick={() => removeItem(id, color, size)}
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
              <path
                d="M1 5H17M7 9V15M11 9V15M2 5L3 18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H13C13.5304 20 14.0391 19.7893 14.4142 19.4142C14.7893 19.0391 15 18.5304 15 18L16 5M6 5V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H11C11.2652 1 11.5196 1.10536 11.7071 1.29289C11.8946 1.48043 12 1.73478 12 2V5"
                stroke="#FF3333"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className={styles.bottom}>
          <span className={styles.price}>${price}</span>
          <QuantitySelector
            value={quantity}
            onChange={(newQty) => updateQuantity(id, color, size, newQty)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;