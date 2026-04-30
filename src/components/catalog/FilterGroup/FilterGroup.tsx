// components/catalog/FilterGroup/FilterGroup.tsx
'use client';
import { useState, ReactNode } from 'react';
import styles from './FilterGroup.module.css';

interface FilterGroupProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}

const FilterGroup = ({ title, children, defaultOpen = true }: FilterGroupProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={styles.group}>
            <button 
                className={styles.header} 
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{title}</span>
                <svg 
                    width="12" height="7" 
                    viewBox="0 0 12 7" 
                    fill="none"
                    className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
                >
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </button>
            {isOpen && <div className={styles.content}>{children}</div>}
        </div>
    );
};

export default FilterGroup;