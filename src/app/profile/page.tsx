// app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/layout/Container/Container';
import Breadcrumbs from '@/components/catalog/Breadcrumbs/Breadcrumbs';
import Button from '@/components/ui/Button/Button';
import styles from './page.module.css';
import { useCartStore } from '@/store/cartStore';

interface UserData {
    email: string;
    name: string;
    role: string;
}

const ProfilePage = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const clearCart = useCartStore((state) => state.clearCart);

    useEffect(() => {
        fetch('/api/auth/me')
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error('Not authenticated');
            })
            .then((data) => setUser(data.user))
            .catch(() => router.push('/login'))
            .finally(() => setLoading(false));
    }, [router]);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        clearCart();
        router.push('/login');
    };

    if (loading) {
        return (
            <section>
                <Container>
                    <div className={styles.loading}>Loading...</div>
                </Container>
            </section>
        );
    }

    if (!user) return null;

    return (
        <section>
            <Container>
                <Breadcrumbs items={[{ label: 'Profile' }]} />

                <div className={styles.profile}>
                    <h2>My Account</h2>

                    <div className={styles.info}>
                        <div className={styles.row}>
                            <span className={styles.label}>Name:</span>
                            <span>{user.name || 'Not set'}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Email:</span>
                            <span>{user.email}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Role:</span>
                            <span>{user.role === 'admin' ? 'Administrator' : 'User'}</span>
                        </div>
                    </div>

                    {user.role === 'admin' && (
                        <Button onClick={() => router.push('/admin')}>
                            Go to Admin Panel
                        </Button>
                    )}

                    <Button variant="outline" onClick={handleLogout} className={styles.logoutBtn}>
                        Sign Out
                    </Button>
                </div>
            </Container>
        </section>
    );
};

export default ProfilePage;