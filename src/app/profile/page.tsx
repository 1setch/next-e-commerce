// app/profile/page.tsx
'use client'; // РУС: Клиентский компонент из-за useState, useEffect, useRouter

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

// РУС: Тип для товара в заказе
interface OrderItem {
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

// РУС: Тип для заказа
interface Order {
  _id: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
  totalPrice: number;
  address?: {
    city: string;
    street: string;
  };
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [orders, setOrders] = useState<Order[]>([]); // ← РУС: Добавил тип Order[]
  const [loadingOrders, setLoadingOrders] = useState(false);
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const addToast = useToastStore((state) => state.addToast);

  // РУС: Вынес получение пользователя в отдельную функцию для переиспользования
  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (!res.ok) throw new Error('Not authenticated');
      const data = await res.json();
      setUser(data.user);
      setName(data.user.name || '');
      setImage(data.user.image || '');
    } catch (error) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  // РУС: Загрузка профиля при монтировании
  useEffect(() => {
    fetchUser();
  }, []); // ← РУС: Пустой массив = один раз при загрузке страницы

  // РУС: Загрузка заказов только когда переключились на вкладку Orders
  useEffect(() => {
    if (activeTab === 'orders') {
      const fetchOrders = async () => {
        setLoadingOrders(true);
        try {
          const res = await fetch('/api/orders');
          const data = await res.json();
          setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error('Failed to fetch orders:', error);
          setOrders([]);
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [activeTab]); // ← РУС: Зависимость от activeTab

  // РУС: Загрузка аватара в Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('files', file); // ← РУС: Обрати внимание - 'files' (множественное число)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setImage(data.urls[0]); // ← РУС: data.urls - массив, берём первый
    } catch (error) {
      addToast('Ошибка загрузки изображения', 'error');
    } finally {
      setUploading(false);
    }
  };

  // РУС: Сохранение изменений профиля
  const handleSave = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, image }),
      });

      if (res.ok) {
        const data: { user: UserData } = await res.json();
        setUser(data.user);
        setEditing(false);
        addToast('Профиль обновлён!', 'success');
      } else {
        addToast('Ошибка при обновлении', 'error');
      }
    } catch (error) {
      addToast('Ошибка сети', 'error');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    clearCart(); // РУС: Очищаем корзину при выходе
    router.push('/login');
  };

  if (loading) {
    return (
      <section>
        <Container>
          <div className={styles.loading}>Загрузка...</div> {/* ← РУС: Перевёл на русский */}
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

          {/* РУС: Табы переключения */}
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
              {/* РУС: Секция аватара */}
              <div className={styles.avatarSection}>
                <div className={styles.avatar}>
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
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

              {/* РУС: Режим редактирования */}
              {editing ? (
                <div className={styles.editForm}>
                  <Input
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
                  <div className={styles.editActions}>
                    <Button onClick={handleSave}>Сохранить</Button>
                    <Button variant="outline" onClick={() => {
                      setEditing(false);
                      setName(user.name || ''); // ← РУС: Сброс изменений
                      setImage(user.image || '');
                    }}>Отменить</Button>
                  </div>
                </div>
              ) : (
                <div className={styles.info}>
                  <div className={styles.row}>
                    <span className={styles.label}>Имя:</span>
                    <span>{user.name || 'Не указано'}</span> {/* ← РУС: Перевёл */}
                  </div>
                  <div className={styles.row}>
                    <span className={styles.label}>Email:</span>
                    <span>{user.email}</span>
                  </div>
                  {/* РУС: Роль закомментирована, но может пригодиться для отладки */}
                  <Button variant="outline" onClick={() => setEditing(true)} className={styles.editBtn}>
                    Редактировать профиль
                  </Button>
                </div>
              )}

              {/* РУС: Админ-панель доступна только админам */}
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
            /* РУС: История заказов */
            <div className={styles.orders}>
              {loadingOrders ? (
                <p className={styles.emptyText}>Загрузка заказов...</p>
              ) : orders.length === 0 ? (
                <div className={styles.emptyOrders}>
                  <p>У вас нет заказов</p>
                  <Button onClick={() => router.push('/catalog')}>Начать покупки</Button> {/* ← РУС: Перевёл */}
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order._id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div>
                        <span className={styles.orderId}>Заказ #{order._id.slice(-6)}</span>
                        <span className={`${styles.orderStatus} ${styles[`status_${order.status}`]}`}>
                          {order.status === 'paid' ? 'Оплачен' : 
                           order.status === 'shipped' ? 'Отправлен' : 
                           order.status === 'delivered' ? 'Доставлен' : order.status}
                        </span>
                      </div>
                      <span className={styles.orderDate}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles.orderItems}>
                      {order.items.map((item, i) => (
                        <div key={i} className={styles.orderItem}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.name} className={styles.orderItemImage} />
                          <div className={styles.orderItemInfo}>
                            <span className={styles.orderItemName}>{item.name}</span>
                            <span className={styles.orderItemMeta}>
                              {item.size} | {item.color} | Количество: {item.quantity}
                            </span>
                          </div>
                          <span className={styles.orderItemPrice}>
                            {item.price * item.quantity} ₽
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.orderFooter}>
                      {order.address && (
                        <span className={styles.orderAddress}>
                          {order.address.city}, {order.address.street}
                        </span>
                      )}
                      <span className={styles.orderTotal}>Итого: {order.totalPrice} ₽</span>
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