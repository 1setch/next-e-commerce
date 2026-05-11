// app/register/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/layout/Container/Container';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import styles from './page.module.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    if (res.ok) {
      setRegistered(true);
    } else {
      const data = await res.json();
      setError(data.error || 'Registration failed');
    }
    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }
  };

  if (registered) {
    return (
      <section>
        <Container>
          <div className={styles.register}>
            <h2>Проверьте почту</h2>
            <p className={styles.successMessage}>
              Мы отправили ссылку для подтверждения на {email}. Пожалуйста, проверьте почту и перейдите по ссылке.
            </p>
            <Link href="/login" className={styles.link}>Перейти ко входу</Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Container>
        <div className={styles.register}>
          <h2>Создание аккаунта</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              placeholder="Имя пользователя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            {error && <p className={styles.error}>{error}</p>}
            <Button type="submit">Зарегистрироваться</Button>
          </form>
          <p className={styles.loginLink}>
            Уже есть аккаунт? <Link href="/login">Вход</Link>
          </p>
        </div>
      </Container>
    </section>
  );
};

export default RegisterPage;