// components/product/ProductTabs/ProductTabs.tsx
'use client';

import { useState } from 'react';
import styles from './ProductTabs.module.css';

interface ProductTabsProps {
  description: string;
  reviews?: { user: string; rating: number; text: string }[];
  questions?: { user: string; question: string; answer: string }[];
}

const ProductTabs = ({ description, reviews = [], questions = [] }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'faq'>('details');

  const tabs = [
    { key: 'details' as const, label: 'Product Details' },
    { key: 'reviews' as const, label: 'Rating & Reviews' },
    { key: 'faq' as const, label: 'FAQs' },
  ];

  return (
    <div className={styles.tabs}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <hr className={styles.divider} />

      <div className={styles.content}>
        {activeTab === 'details' && (
          <div className={styles.details}>
            <p>{description}</p>
            <ul>
              <li>100% organic cotton</li>
              <li>Machine washable at 30°C</li>
              <li>Regular fit</li>
              <li>Imported</li>
            </ul>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className={styles.reviews}>
            {reviews.length === 0 ? (
              <div className={styles.empty}>
                <p>No reviews yet. Be the first to review this product!</p>
                <button className={styles.writeReview}>Write a Review</button>
              </div>
            ) : (
              reviews.map((review, i) => (
                <div key={i} className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewUser}>{review.user}</span>
                    <span className={styles.reviewRating}>{'★'.repeat(review.rating)}</span>
                  </div>
                  <p>{review.text}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'faq' && (
          <div className={styles.faq}>
            {questions.length === 0 ? (
              <p className={styles.empty}>No questions yet. Ask a question about this product.</p>
            ) : (
              questions.map((item, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;