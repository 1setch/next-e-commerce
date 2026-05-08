// app/cart/page.tsx
'use client';

import Container from '@/components/layout/Container/Container';
import Breadcrumbs from '@/components/catalog/Breadcrumbs/Breadcrumbs';
import CartItem from '@/components/cart/CartItem/CartItem';
import CartSummary from '@/components/cart/CartSummary/CartSummary';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import styles from './page.module.css';
import { useEffect, useState } from 'react';

const CartPage = () => {
    const items = useCartStore((state) => state.items);
    const fetchServerCart = useCartStore((state) => state.fetchServerCart);

    // Флаг что корзина только что очищена
  const [justCleared, setJustCleared] = useState(false);

    useEffect(() => {
    // Не загружаем с сервера если только что очистили
    if (!justCleared) {
      fetchServerCart();
    }
  }, [fetchServerCart, justCleared]);

    if (items.length === 0) {
        return (
            <section>
                <Container>
                    <Breadcrumbs items={[{ label: 'Корзина' }]} />
                    <h2 className={styles.title}>Ваша корзина</h2>
                    <div className={styles.empty}>
                        <p>Ваша корзина пуста :(</p>
                        <Link href="/catalog" className={styles.link}>Перейти в каталог</Link>
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section>
            <Container>
                <Breadcrumbs items={[{ label: 'Корзина' }]} />
                <h2 className={styles.title}>Ваша корзина</h2>
                <div className={styles.layout}>
                    <div className={styles.items}>
                        {items.map((item, index) => (
                            <div key={`${item.productId}-${item.color}-${item.size}`}>
                                {index > 0 && <hr className={styles.divider} />}
                                <CartItem
                                    id={item.productId}
                                    name={item.name}
                                    size={item.size}
                                    color={item.color}
                                    colorHex={item.colorHex}
                                    price={item.price}
                                    image={item.image}
                                    quantity={item.quantity}
                                />
                            </div>
                        ))}
                    </div>
                    <CartSummary />
                </div>
            </Container>
        </section>
    );
};

export default CartPage;