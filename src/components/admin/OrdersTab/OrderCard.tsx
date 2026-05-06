'use client';

import styles from './OrderCard.module.css';

interface OrderCardProps {
    order: any;
    expandedOrderId: string | null;
    onToggleExpand: (orderId: string) => void;
    onStatusChange: (orderId: string, newStatus: string) => void;
    isUpdating?: boolean;
}

export const OrderCard = ({ 
    order, 
    expandedOrderId, 
    onToggleExpand, 
    onStatusChange,
    isUpdating = false
}: OrderCardProps) => {
    const isExpanded = expandedOrderId === order._id;

    return (
        <div className={styles.orderCard}>
            <div className={styles.orderHeader} onClick={() => onToggleExpand(order._id)}>
                <div>
                    <span className={styles.orderId}>#{order._id.slice(-6)}</span>
                    <span className={`${styles.orderStatus} ${styles[`status_${order.status}`]}`}>
                        {order.status}
                    </span>
                </div>
                <div className={styles.orderHeaderRight}>
                    <span className={styles.orderTotal}>${order.totalPrice}</span>
                    <svg
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                        className={`${styles.expandIcon} ${isExpanded ? styles.expandIconOpen : ''}`}
                    >
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
            </div>

            {isExpanded && (
                <div className={styles.orderDetails}>
                    <div className={styles.orderDetailGrid}>
                        <div>
                            <span className={styles.detailLabel}>Date</span>
                            <span>{new Date(order.createdAt).toLocaleString()}</span>
                        </div>
                        <div>
                            <span className={styles.detailLabel}>Status</span>
                            <select
                                value={order.status}
                                onChange={(e) => onStatusChange(order._id, e.target.value)}
                                className={styles.statusSelect}
                                disabled={isUpdating}
                            >
                                <option value="paid">Paid</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                            </select>
                            {isUpdating && <span className={styles.updatingIndicator}>Updating...</span>}
                        </div>
                    </div>

                    {order.address && (
                        <div className={styles.orderDetailGrid}>
                            <div>
                                <span className={styles.detailLabel}>Customer</span>
                                <span>{order.address.name}</span>
                            </div>
                            <div>
                                <span className={styles.detailLabel}>Phone</span>
                                <span>{order.address.phone}</span>
                            </div>
                            <div>
                                <span className={styles.detailLabel}>Email</span>
                                <span>{order.address.email}</span>
                            </div>
                            <div>
                                <span className={styles.detailLabel}>Address</span>
                                <span>{order.address.city}, {order.address.street}, {order.address.zip}</span>
                            </div>
                        </div>
                    )}

                    <div className={styles.orderItemsList}>
                        <span className={styles.detailLabel}>Items ({order.items.length})</span>
                        {order.items.map((item: any, i: number) => (
                            <div key={i} className={styles.orderItemRow}>
                                <img src={item.image} alt="" className={styles.orderItemThumb} />
                                <span className={styles.orderItemName}>{item.name}</span>
                                <span>{item.size} | {item.color}</span>
                                <span>×{item.quantity}</span>
                                <span className={styles.orderItemPrice}>${item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};