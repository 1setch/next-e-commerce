// app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/layout/Container/Container';
import Breadcrumbs from '@/components/catalog/Breadcrumbs/Breadcrumbs';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import styles from './page.module.css';

interface UserData {
  email: string;
  name: string;
  role: string;
  image?: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const addToast = useToastStore((state) => state.addToast);

  const fetchUser = () => {
    fetch('/api/auth/me')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Not authenticated');
      })
      .then((data) => {
        setUser(data.user);
        setName(data.user.name || '');
        setImage(data.user.image || '');
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (activeTab === 'orders') {
      setLoadingOrders(true);
      fetch('/api/orders')
        .then((res) => res.json())
        .then((data) => setOrders(Array.isArray(data) ? data : []))
        .finally(() => setLoadingOrders(false));
    }
  }, [activeTab]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('files', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setImage(data.urls[0]);
    setUploading(false);
  };

  const handleSave = async () => {
    const res = await fetch('/api/auth/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, image }),
    });

    if (res.ok) {
      const data: { user: UserData } = await res.json();
      console.log('Saved user:', data.user); // ← вот сюда
      setUser(data.user);
      setEditing(false);
      addToast('Profile updated!', 'success');
    }
  };

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
        <Breadcrumbs items={[{ label: 'Профиль' }]} />

        <div className={styles.profile}>
          <h2>Мой аккаунт</h2>

          {/* Табы */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'profile' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Профиль
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'orders' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Заказы
            </button>
          </div>

          {activeTab === 'profile' ? (
            <>
              <div className={styles.avatarSection}>
                <div className={styles.avatar}>
                  {image ? (
                    <img src={image} alt="Avatar" />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      {(user.name || user.email)[0].toUpperCase()}
                    </div>
                  )}
                </div>
                {editing && (
                  <div className={styles.avatarUpload}>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    {uploading && <span>Загрузка...</span>}
                  </div>
                )}
              </div>

              {editing ? (
                <div className={styles.editForm}>
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
                  <div className={styles.editActions}>
                    <Button onClick={handleSave}>Сохранить</Button>
                    <Button variant="outline" onClick={() => setEditing(false)}>Отменить</Button>
                  </div>
                </div>
              ) : (
                <div className={styles.info}>
                  <div className={styles.row}>
                    <span className={styles.label}>Имя:</span>
                    <span>{user.name || 'Not set'}</span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.label}>Email:</span>
                    <span>{user.email}</span>
                  </div>
                  {/* <div className={styles.row}>
                    <span className={styles.label}>Роль:</span>
                    <span>{user.role === 'admin' ? 'Administrator' : 'User'}</span>
                  </div> */}
                  <Button variant="outline" onClick={() => setEditing(true)} className={styles.editBtn}>
                    Редактировать профиль
                  </Button>
                </div>
              )}

              {user?.role === 'admin' && (
                <Button onClick={() => router.push('/admin')} className={styles.adminBtn}>
                  Админ панель
                </Button>
              )}

              <Button variant="ghost" onClick={handleLogout} className={styles.logoutBtn}>
                Выйти из аккаунта
              </Button>
            </>
          ) : (
            /* История заказов */
            <div className={styles.orders}>
              {loadingOrders ? (
                <p className={styles.emptyText}>Загрузка заказов...</p>
              ) : orders.length === 0 ? (
                <div className={styles.emptyOrders}>
                  <p>У вас нет заказов</p>
                  <Button onClick={() => router.push('/catalog')}>Start Shopping</Button>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order._id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div>
                        <span className={styles.orderId}>Заказ #{order._id.slice(-6)}</span>
                        <span className={`${styles.orderStatus} ${styles[`status_${order.status}`]}`}>
                          {order.status}
                        </span>
                      </div>
                      <span className={styles.orderDate}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles.orderItems}>
                      {order.items.map((item: any, i: number) => (
                        <div key={i} className={styles.orderItem}>
                          <img src={item.image} alt={item.name} className={styles.orderItemImage} />
                          <div className={styles.orderItemInfo}>
                            <span className={styles.orderItemName}>{item.name}</span>
                            <span className={styles.orderItemMeta}>
                              {item.size} | {item.color} | Qty: {item.quantity}
                            </span>
                          </div>
                          <span className={styles.orderItemPrice}>{item.price * item.quantity}{" ₽"}</span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.orderFooter}>
                      {order.address && (
                        <span className={styles.orderAddress}>
                          {order.address.city}, {order.address.street}
                        </span>
                      )}
                      <span className={styles.orderTotal}>Итого: {order.totalPrice}{" ₽"}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default ProfilePage;