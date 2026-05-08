'use client';

import { useState } from 'react';
import { OrderCard } from './OrderCard';
import styles from './OrdersTab.module.css';

interface OrdersTabProps {
    orders: any[];
    isLoading: boolean;
    onUpdateOrder: (orderId: string, newStatus: string) => Promise<void>;
    onRefresh: () => Promise<void>;
}

export const OrdersTab = ({ orders, isLoading, onUpdateOrder, onRefresh }: OrdersTabProps) => {
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

    const handleToggleExpand = (orderId: string) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        setUpdatingOrderId(orderId);
        await onUpdateOrder(orderId, newStatus);
        setUpdatingOrderId(null);
    };

    if (isLoading && orders.length === 0) {
        return (
            <div className={styles.ordersSection}>
                <h3>Заказы</h3>
                <div className={styles.loadingState}>
                    <div className={styles.spinner}></div>
                    <p>Loading orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.ordersSection}>
            <div className={styles.sectionHeader}>
                <h3>Заказы</h3>
                <button onClick={onRefresh} className={styles.refreshBtn} disabled={isLoading}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={isLoading ? styles.spinning : ''}>
                        <path d="M14 2V6H10M2 14V10H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M13 3C11.5 1.5 9 1 6.5 2C3.5 3 1.5 6 2 9.5M14 6.5C14.5 10 12.5 13 9.5 14C7 15 4.5 14.5 3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Обновить
                </button>
            </div>
            
            {orders.length === 0 ? (
                <p className={styles.emptyText}>Пока заказов нет</p>
            ) : (
                orders.map((order) => (
                    <OrderCard
                        key={order._id}
                        order={order}
                        expandedOrderId={expandedOrder}
                        onToggleExpand={handleToggleExpand}
                        onStatusChange={handleStatusChange}
                        isUpdating={updatingOrderId === order._id}
                    />
                ))
            )}
        </div>
    );
};