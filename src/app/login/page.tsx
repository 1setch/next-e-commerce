// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/layout/Container/Container';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import styles from './page.module.css';
import Link from 'next/link';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

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
                    <h2>Sign In</h2>
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
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                        {error && <p className={styles.error}>{error}</p>}
                        <Button type="submit">Sign In</Button>
                    </form>
                    <p className={styles.registerLink}>
                        Don&apos;t have an account? <Link href="/register">Sign Up</Link>
                    </p>
                </div>
            </Container>
        </section>
    );
};

export default LoginPage;