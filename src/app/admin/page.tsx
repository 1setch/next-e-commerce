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
    const loadQuestions = useCallback(async (force = false) => {
        setIsLoadingQuestions(true);
        try {
            const prods = await fetch('/api/products?limit=100').then(r => r.json());
            const allQuestions: any[] = [];
            
            for (const p of prods.data) {
                const res = await fetch(`/api/questions?productId=${p._id}`);
                const qs = await res.json();
                if (Array.isArray(qs)) {
                    qs.forEach((q: any) => allQuestions.push({ ...q, productName: p.name }));
                }
            }
            
            allQuestions.sort((a, b) => {
                if (a.answer && !b.answer) return 1;
                if (!a.answer && b.answer) return -1;
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
            
            setQuestions(allQuestions);
            const pendingCount = allQuestions.filter(q => !q.answer).length;
            setPendingQuestionsCount(pendingCount);
        } catch (error) {
            console.error('Failed to fetch questions:', error);
            setQuestions([]);
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
        // Оптимистическое обновление
        setOrders(prevOrders => {
            const updated = prevOrders.map(order => 
                order._id === orderId 
                    ? { ...order, status: newStatus }
                    : order
            );
            setOrdersCount(updated.filter(o => o.status === 'paid').length);
            return updated;
        });
        
        // Отправляем запрос
        try {
            await fetch(`/api/admin/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
        } catch (error) {
            console.error('Failed to update order:', error);
            await loadOrders(); // При ошибке перезагружаем
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