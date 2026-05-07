'use client';

import { useState, useEffect, useCallback } from 'react';
import Container from '@/components/layout/Container/Container';
import { AdminTabs } from '@/components/admin/AdminTabs';
import { ProductsTab } from '@/components/admin/ProductsTab/ProductsTab';
import { OrdersTab } from '@/components/admin/OrdersTab/OrdersTab';
import { QuestionsTab } from '@/components/admin/QuestionsTab/QuestionsTab';

const AdminPage = () => {
    const [activeView, setActiveView] = useState<'products' | 'orders' | 'questions'>('products');

    const [orders, setOrders] = useState<any[]>([]);
    const [questions, setQuestions] = useState<any[]>([]);
    const [ordersCount, setOrdersCount] = useState(0);
    const [pendingQuestionsCount, setPendingQuestionsCount] = useState(0);

    const [isLoadingOrders, setIsLoadingOrders] = useState(false);
    const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

    // Функция загрузки заказов (всегда загружает свежие данные)
    const loadOrders = useCallback(async (force = false) => {
        setIsLoadingOrders(true);
        try {
            const res = await fetch('/api/admin/orders');
            const data = await res.json();
            const ordersData = Array.isArray(data) ? data : [];
            setOrders(ordersData);
            setOrdersCount(ordersData.filter((o: any) => o.status === 'paid').length);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            setOrders([]);
        } finally {
            setIsLoadingOrders(false);
        }
    }, []);

    // Функция загрузки вопросов (всегда загружает свежие данные)
    const loadQuestions = useCallback(async () => {
        setIsLoadingQuestions(true);
        try {
            const res = await fetch('/api/admin/questions');
            const allQuestions = await res.json();
            setQuestions(Array.isArray(allQuestions) ? allQuestions : []);
            setPendingQuestionsCount(
                (Array.isArray(allQuestions) ? allQuestions : []).filter((q: any) => !q.answer).length
            );
        } catch (error) {
            console.error('Failed to fetch questions:', error);
        } finally {
            setIsLoadingQuestions(false);
        }
    }, []);

    // Предзагрузка при монтировании
    useEffect(() => {
        loadOrders();
        loadQuestions();
    }, []); // Загружаем только один раз при монтировании

    // Обновление заказа (оптимистическое)
    const updateOrderStatus = useCallback(async (orderId: string, newStatus: string) => {
        setOrders(prevOrders => {
            const updated = prevOrders.map(order =>
                order._id === orderId
                    ? { ...order, status: newStatus }
                    : order
            );
            setOrdersCount(updated.filter(o => o.status === 'paid').length);
            return updated;
        });

        try {
            const res = await fetch(`/api/admin/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await res.json();
            console.log('Update order response:', data);

            if (!res.ok) {
                console.error('Update order failed:', data);
                await loadOrders(); // перезагружаем при ошибке
            }
        } catch (error) {
            console.error('Failed to update order:', error);
            await loadOrders();
        }
    }, [loadOrders]);

    // Обновление вопроса (оптимистическое)
    const updateQuestionAnswer = useCallback(async (questionId: string, answer: string) => {
        // Оптимистическое обновление
        setQuestions(prevQuestions => {
            const updated = prevQuestions.map(question =>
                question._id === questionId
                    ? { ...question, answer }
                    : question
            );
            setPendingQuestionsCount(updated.filter(q => !q.answer).length);
            return updated;
        });

        // Отправляем запрос
        try {
            await fetch(`/api/questions/${questionId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answer }),
            });
        } catch (error) {
            console.error('Failed to update answer:', error);
            await loadQuestions(); // При ошибке перезагружаем
        }
    }, [loadQuestions]);

    // Ручное обновление (принудительная перезагрузка)
    const refreshOrders = useCallback(async () => {
        await loadOrders();
    }, [loadOrders]);

    const refreshQuestions = useCallback(async () => {
        await loadQuestions();
    }, [loadQuestions]);

    return (
        <section>
            <Container>
                <AdminTabs
                    activeView={activeView}
                    onViewChange={setActiveView}
                    ordersCount={ordersCount}
                    pendingQuestionsCount={pendingQuestionsCount}
                    isLoadingOrders={isLoadingOrders}
                    isLoadingQuestions={isLoadingQuestions}
                />

                {activeView === 'products' && <ProductsTab />}
                {activeView === 'orders' && (
                    <OrdersTab
                        orders={orders}
                        isLoading={isLoadingOrders}
                        onUpdateOrder={updateOrderStatus}
                        onRefresh={refreshOrders}
                    />
                )}
                {activeView === 'questions' && (
                    <QuestionsTab
                        questions={questions}
                        isLoading={isLoadingQuestions}
                        onUpdateAnswer={updateQuestionAnswer}
                        onRefresh={refreshQuestions}
                    />
                )}
            </Container>
        </section>
    );
};

export default AdminPage;