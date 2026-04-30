// components/catalog/PriceRange/PriceRange.tsx
'use client';
import { useState } from 'react';
import styles from './PriceRange.module.css';

const PriceRange = () => {
    const minPrice = 0;
    const maxPrice = 500;
    const [min, setMin] = useState(50);
    const [max, setMax] = useState(300);

    const minPercent = ((min - minPrice) / (maxPrice - minPrice)) * 100;
    const maxPercent = ((max - minPrice) / (maxPrice - minPrice)) * 100;

    return (
        <div className={styles.range}>
            <div className={styles.track}>
                <div 
                    className={styles.fill} 
                    style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
                />
                <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={min}
                    onChange={(e) => setMin(Math.min(Number(e.target.value), max - 10))}
                    className={`${styles.input} ${styles.inputMin}`}
                />
                <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={max}
                    onChange={(e) => setMax(Math.max(Number(e.target.value), min + 10))}
                    className={`${styles.input} ${styles.inputMax}`}
                />
            </div>
            <div className={styles.values}>
                <span>${min}</span>
                <span>${max}</span>
            </div>
        </div>
    );
};

export default PriceRange;