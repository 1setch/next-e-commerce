// app/login/page.tsx
'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/layout/Container/Container';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import styles from './page.module.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
export const dynamic = 'force-dynamic';

const LoginContent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const verified = searchParams.get('verified');
    const errorParam = searchParams.get('error');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            router.push('/admin');
        } else {
            const data = await res.json();
            setError(data.error || 'Login failed');
        }
    };

    return (
        <section>
            <Container>
                <div className={styles.login}>
                    <h2>Вход</h2>
                    {verified === 'true' && (
                        <p className={styles.success}>Email verified! You can now sign in.</p>
                    )}
                    {errorParam && (
                        <p className={styles.error}>Verification link is invalid or expired.</p>
                    )}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        />
                        <Input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                        {error && <p className={styles.error}>{error}</p>}
                        <Button type="submit">Войти</Button>
                    </form>
                    <p className={styles.registerLink}>
                        Еще нет аккаунта? <Link href="/register">Регистрация</Link>
                    </p>
                </div>
            </Container>
        </section>
    );
};

// Основной экспорт
export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}