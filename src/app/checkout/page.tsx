// app/checkout/page.tsx
'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/layout/Container/Container';
import Breadcrumbs from '@/components/catalog/Breadcrumbs/Breadcrumbs';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import styles from './page.module.css';
import { useSearchParams } from 'next/navigation';
import { validatePromo } from '@/lib/data/promoCodes';

export const dynamic = 'force-dynamic';

interface AddressForm {
    name: string;
    phone: string;
    email: string;
    city: string;
    street: string;
    zip: string;
}

const CheckoutContent = () => {
    const router = useRouter();
    const { items, totalPrice, clearCart } = useCartStore();
    const addToast = useToastStore((state) => state.addToast);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState<AddressForm>({
        name: '',
        phone: '',
        email: '',
        city: '',
        street: '',
        zip: '',
    });
    const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');

    const searchParams = useSearchParams();
    const promoCode = searchParams.get('promo') || '';
    const promo = promoCode ? validatePromo(promoCode) : null;

    const subtotal = totalPrice();
    const baseDelivery = deliveryMethod === 'express' ? 750 : 550;
    const promoDiscount = promo?.discount || 0;
    const delivery = Math.max(0, baseDelivery - promoDiscount);
    const discount = Math.round(subtotal * 0.2);
    const total = subtotal - discount + delivery;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    address,
                    deliveryMethod,
                    paymentMethod,
                    totalPrice: total,
                    items,
                }),
            });

            if (res.ok) {
                clearCart();
                addToast('Заказ оформлен!', 'success');
                router.push('/profile?order=success');
            } else {
                addToast('Ошибка оформления заказа', 'error');
            }
        } catch {
            addToast('Что-то пошло не так', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <section>
                <Container>
                    <Breadcrumbs items={[{ label: 'Оплата' }]} />
                    <div className={styles.empty}>
                        <h2>Ваша корзина пуста</h2>
                        <Button onClick={() => router.push('/catalog')}>Перейти в каталог</Button>
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section>
            <Container>
                <Breadcrumbs items={[{ label: 'Корзина', href: '/cart' }, { label: 'Оплата' }]} />

                <h2 className={styles.title}>Оплата</h2>

                <form onSubmit={handleSubmit} className={styles.layout}>
                    {/* Левая колонка — адрес и товары */}
                    <div className={styles.left}>
                        {/* Адрес доставки */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Адрес доставки</h3>
                            <div className={styles.formGrid}>
                                <Input
                                    placeholder="Полное ФИО"
                                    value={address.name}
                                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                                    fullWidth
                                    required
                                />
                                <Input
                                    placeholder="Номер телефона"
                                    type="tel"
                                    value={address.phone}
                                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                                    fullWidth
                                    required
                                />
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    value={address.email}
                                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                                    fullWidth
                                    required
                                />
                                <Input
                                    placeholder="Город"
                                    value={address.city}
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                    fullWidth
                                    required
                                />
                                <Input
                                    placeholder="Адресс"
                                    value={address.street}
                                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                    fullWidth
                                    required
                                />
                                <Input
                                    placeholder="Почтовый индекс"
                                    value={address.zip}
                                    onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                                    fullWidth
                                    required
                                />
                            </div>
                        </div>

                        {/* Способ доставки */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Метод доставки</h3>
                            <div className={styles.radioGroup}>
                                <label className={`${styles.radioLabel} ${deliveryMethod === 'standard' ? styles.radioActive : ''}`}>
                                    <input
                                        type="radio"
                                        name="delivery"
                                        checked={deliveryMethod === 'standard'}
                                        onChange={() => setDeliveryMethod('standard')}
                                    />
                                    <div>
                                        <span className={styles.radioTitle}>Почта России</span>
                                        <span className={styles.radioDesc}>3-5 рабочих дней</span>
                                    </div>
                                </label>
                                <label className={`${styles.radioLabel} ${deliveryMethod === 'express' ? styles.radioActive : ''}`}>
                                    <input
                                        type="radio"
                                        name="delivery"
                                        checked={deliveryMethod === 'express'}
                                        onChange={() => setDeliveryMethod('express')}
                                    />
                                    <div>
                                        <span className={styles.radioTitle}>СДЭК</span>
                                        <span className={styles.radioDesc}>1-2 рабочих дня</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Способ оплаты */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Метод оплаты</h3>
                            <div className={styles.radioGroup}>
                                <label className={`${styles.radioLabel} ${paymentMethod === 'card' ? styles.radioActive : ''}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                    />
                                    <div>
                                        <span className={styles.radioTitle}>Банковская карта</span>
                                        <span className={styles.radioDesc}>Мир, Visa, Mastercard</span>
                                    </div>
                                </label>
                                <label className={`${styles.radioLabel} ${paymentMethod === 'cash' ? styles.radioActive : ''}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === 'cash'}
                                        onChange={() => setPaymentMethod('cash')}
                                    />
                                    <div>
                                        <span className={styles.radioTitle}>СБП</span>
                                        <span className={styles.radioDesc}>Система быстрых платежей</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Товары */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Выбранные товары ({items.length})</h3>
                            <div className={styles.items}>
                                {items.map((item) => (
                                    <div key={`${item.productId}-${item.color}-${item.size}`} className={styles.item}>
                                        <img src={item.image} alt={item.name} className={styles.itemImage} />
                                        <div className={styles.itemInfo}>
                                            <span className={styles.itemName}>{item.name}</span>
                                            <span className={styles.itemMeta}>Размер: {item.size} | Цвет: {item.color}</span>
                                            <span className={styles.itemMeta}>Количество: {item.quantity}</span>
                                        </div>
                                        <span className={styles.itemPrice}>{item.price * item.quantity}{' ₽'}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Правая колонка — итог */}
                    <div className={styles.right}>
                        <div className={styles.summary}>
                            <h3 className={styles.sectionTitle}>Ваша корзина</h3>
                            <div className={styles.summaryRows}>
                                <div className={styles.summaryRow}>
                                    <span>Товары</span>
                                    <span>{subtotal}{' ₽'}</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Скидка (-20%)</span>
                                    <span className={styles.discount}>-{discount} {' ₽'}</span>
                                </div>
                                {promo && (
                                    <div className={styles.summaryRow}>
                                        <span>Промокод "{promo.code}"</span>
                                        <span className={styles.discount}>-{promoDiscount}{' ₽'}</span>
                                    </div>
                                )}
                                <div className={styles.summaryRow}>
                                    <span>Доставка</span>
                                    <span>{promoDiscount >= baseDelivery ? <s>${baseDelivery}</s> : null} {delivery} {' ₽'}</span>
                                </div>
                            </div>
                            <hr className={styles.divider} />
                            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                                <span>Итого</span>
                                <span>{total} {' ₽'}</span>
                            </div>
                            <Button type="submit" className={styles.payBtn} disabled={loading}>
                                {loading ? 'Подождите...' : `Оплатить ${total} ₽`}
                            </Button>
                        </div>
                    </div>
                </form>
            </Container>
        </section>
    );
};

// Основной экспорт с Suspense
export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <section>
        <Container>
          <Breadcrumbs items={[{ label: 'Оплата' }]} />
          <div className={styles.loading}>Loading...</div>
        </Container>
      </section>
    }>
      <CheckoutContent />
    </Suspense>
  );
}