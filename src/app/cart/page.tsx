// app/cart/page.tsx
'use client';
import Container from '@/components/layout/Container/Container';
import Breadcrumbs from '@/components/catalog/Breadcrumbs/Breadcrumbs';
import CartItem from '@/components/cart/CartItem/CartItem';
import CartSummary from '@/components/cart/CartSummary/CartSummary';
import styles from './page.module.css';

const CartPage = () => {
    return (
        <section>
            <Container>
                <Breadcrumbs />
                
                <h2 className={styles.title}>Your Cart</h2>
                
                <div className={styles.layout}>
                    <div className={styles.items}>
                        <CartItem 
                            id={1}
                            name="Gradient Graphic T-shirt"
                            size="Large"
                            color="White"
                            colorHex="#FFFFFF"
                            price={145}
                        />
                        <hr className={styles.divider} />
                        <CartItem 
                            id={2}
                            name="CHECKERED SHIRT"
                            size="Medium"
                            color="Red"
                            colorHex="#C41E3A"
                            price={180}
                        />
                        <hr className={styles.divider} />
                        <CartItem 
                            id={3}
                            name="SKINNY FIT JEANS"
                            size="Large"
                            color="Blue"
                            colorHex="#4169E1"
                            price={240}
                        />
                    </div>
                    
                    <CartSummary />
                </div>
            </Container>
        </section>
    );
};

export default CartPage;