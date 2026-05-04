// components/cart/CartSummary/CartSummary.tsx
'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { useCartStore } from '@/store/cartStore';
import styles from './CartSummary.module.css';

const CartSummary = () => {
  const { totalPrice, items } = useCartStore();
  const subtotal = totalPrice();
  const discount = Math.round(subtotal * 0.2);
  const delivery = 15;
  const total = subtotal - discount + delivery;
  const [promo, setPromo] = useState('');

  const handleCheckout = () => {
    // Пока просто заглушка, потом будет мутация
    alert(`Order placed! Total: $${total}`);
  };

  return (
    <div className={styles.summary}>
      <h3 className={styles.title}>Order Summary</h3>

      <div className={styles.rows}>
        <div className={styles.row}>
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className={styles.row}>
          <span>Discount (-20%)</span>
          <span className={styles.discount}>-${discount}</span>
        </div>
        <div className={styles.row}>
          <span>Delivery Fee</span>
          <span>${delivery}</span>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={`${styles.row} ${styles.totalRow}`}>
        <span>Total</span>
        <span>${total}</span>
      </div>

      <div className={styles.promo}>
        <Input
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20.438 11.804L12.18 3.54598C11.819 3.1832 11.3808 2.9078 10.8982 2.74098L3.972 0.54998C3.41993 0.373962 2.82547 0.381985 2.27835 0.572826C1.73122 0.763667 1.25919 1.12745 0.931026 1.61298C0.602864 2.09851 0.435068 2.68133 0.451997 3.27398V3.65498C0.453957 3.90941 0.506681 4.16126 0.606997 4.39598L3.21 11.095C3.376 11.576 3.651 12.014 4.014 12.374L12.213 20.575C12.9634 21.3234 14.0244 21.6352 15.03 21.401C16.0356 21.1668 16.857 20.4162 17.21 19.405L20.424 14.138C20.7907 13.4269 20.7993 12.5826 20.447 11.864L20.438 11.804Z"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          placeholder="Add promo code"
          variant="outline"
          fullWidth
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
        />
        <Button variant="default" className={styles.promoBtn}>Apply</Button>
      </div>

      <Button variant="default" className={styles.checkoutBtn} onClick={handleCheckout}>
        Go to Checkout
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
    </div>
  );
};

export default CartSummary;