// components/catalog/SortSelect/SortSelect.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './SortSelect.module.css';

const sortOptions = [
    'Most Popular',
    'Newest',
    'Price: Low to High',
    'Price: High to Low',
    'Best Rating',
];

const SortSelect = () => {
    const [selected, setSelected] = useState(sortOptions[0]);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.sort} ref={ref}>
            <span className={styles.label}>Sort by:</span>
            <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
                {selected}
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </button>
            {isOpen && (
                <div className={styles.dropdown}>
                    {sortOptions.map((option) => (
                        <button
                            key={option}
                            className={`${styles.option} ${option === selected ? styles.optionActive : ''}`}
                            onClick={() => {
                                setSelected(option);
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortSelect;