'use client';

import styles from './AdminTabs.module.css';

interface AdminTabsProps {
    activeView: 'products' | 'orders' | 'questions';
    onViewChange: (view: 'products' | 'orders' | 'questions') => void;
    ordersCount: number;
    pendingQuestionsCount: number;
    isLoadingOrders?: boolean;
    isLoadingQuestions?: boolean;
}

export const AdminTabs = ({ 
    activeView, 
    onViewChange, 
    ordersCount, 
    pendingQuestionsCount,
    isLoadingOrders = false,
    isLoadingQuestions = false
}: AdminTabsProps) => {
    return (
        <div className={styles.viewTabs}>
            <button
                className={`${styles.viewTab} ${activeView === 'products' ? styles.viewTabActive : ''}`}
                onClick={() => onViewChange('products')}
            >
                Products
            </button>
            <button
                className={`${styles.viewTab} ${activeView === 'orders' ? styles.viewTabActive : ''}`}
                onClick={() => onViewChange('orders')}
            >
                Orders 
                {isLoadingOrders ? (
                    <span className={styles.badgeLoading}>
                        <span className={styles.spinner}></span>
                    </span>
                ) : ordersCount > 0 && (
                    <span className={styles.badge}>{ordersCount}</span>
                )}
            </button>
            <button
                className={`${styles.viewTab} ${activeView === 'questions' ? styles.viewTabActive : ''}`}
                onClick={() => onViewChange('questions')}
            >
                Questions
                {isLoadingQuestions ? (
                    <span className={styles.badgeLoading}>
                        <span className={styles.spinner}></span>
                    </span>
                ) : pendingQuestionsCount > 0 && (
                    <span className={styles.badge}>{pendingQuestionsCount}</span>
                )}
            </button>
        </div>
    );
};