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
    const baseDelivery = deliveryMethod === 'express' ? 25 : 15;
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
                addToast('Order placed successfully!', 'success');
                router.push('/profile?order=success');
            } else {
                addToast('Failed to place order', 'error');
            }
        } catch {
            addToast('Something went wrong', 'error');
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
                        <h2>Your cart is empty</h2>
                        <Button onClick={() => router.push('/catalog')}>Continue Shopping</Button>
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
                            <h3 className={styles.sectionTitle}>Delivery Address</h3>
                            <div className={styles.formGrid}>
                                <Input
                                    placeholder="Full Name"
                                    value={address.name}
                                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                                    fullWidth
                                    required
                                />
                                <Input
                                    placeholder="Phone"
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
                                    placeholder="City"
                                    value={address.city}
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                    fullWidth
                                    required
                                />
                                <Input
                                    placeholder="Street Address"
                                    value={address.street}
                                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                    fullWidth
                                    required
                                />
                                <Input
                                    placeholder="ZIP Code"
                                    value={address.zip}
                                    onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                                    fullWidth
                                    required
                                />
                            </div>
                        </div>

                        {/* Способ доставки */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Delivery Method</h3>
                            <div className={styles.radioGroup}>
                                <label className={`${styles.radioLabel} ${deliveryMethod === 'standard' ? styles.radioActive : ''}`}>
                                    <input
                                        type="radio"
                                        name="delivery"
                                        checked={deliveryMethod === 'standard'}
                                        onChange={() => setDeliveryMethod('standard')}
                                    />
                                    <div>
                                        <span className={styles.radioTitle}>Standard Delivery</span>
                                        <span className={styles.radioDesc}>3-5 business days — $15</span>
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
                                        <span className={styles.radioTitle}>Express Delivery</span>
                                        <span className={styles.radioDesc}>1-2 business days — $25</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Способ оплаты */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Payment Method</h3>
                            <div className={styles.radioGroup}>
                                <label className={`${styles.radioLabel} ${paymentMethod === 'card' ? styles.radioActive : ''}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                    />
                                    <div>
                                        <span className={styles.radioTitle}>Credit Card</span>
                                        <span className={styles.radioDesc}>Pay with Visa, Mastercard</span>
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
                                        <span className={styles.radioTitle}>Cash on Delivery</span>
                                        <span className={styles.radioDesc}>Pay when you receive</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Товары */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Order Items ({items.length})</h3>
                            <div className={styles.items}>
                                {items.map((item) => (
                                    <div key={`${item.productId}-${item.color}-${item.size}`} className={styles.item}>
                                        <img src={item.image} alt={item.name} className={styles.itemImage} />
                                        <div className={styles.itemInfo}>
                                            <span className={styles.itemName}>{item.name}</span>
                                            <span className={styles.itemMeta}>Size: {item.size} | Color: {item.color}</span>
                                            <span className={styles.itemMeta}>Qty: {item.quantity}</span>
                                        </div>
                                        <span className={styles.itemPrice}>${item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Правая колонка — итог */}
                    <div className={styles.right}>
                        <div className={styles.summary}>
                            <h3 className={styles.sectionTitle}>Order Summary</h3>
                            <div className={styles.summaryRows}>
                                <div className={styles.summaryRow}>
                                    <span>Subtotal</span>
                                    <span>${subtotal}</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Discount (-20%)</span>
                                    <span className={styles.discount}>-${discount}</span>
                                </div>
                                {promo && (
                                    <div className={styles.summaryRow}>
                                        <span>Promo "{promo.code}"</span>
                                        <span className={styles.discount}>-${promoDiscount}</span>
                                    </div>
                                )}
                                <div className={styles.summaryRow}>
                                    <span>Delivery</span>
                                    <span>{promoDiscount >= baseDelivery ? <s>${baseDelivery}</s> : null} ${delivery}</span>
                                </div>
                            </div>
                            <hr className={styles.divider} />
                            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                            <Button type="submit" className={styles.payBtn} disabled={loading}>
                                {loading ? 'Processing...' : `Pay $${total}`}
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