// components/catalog/SortSelect/SortSelect.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './SortSelect.module.css';

const sortOptions = [
  { label: 'Популярное', value: 'popular' },
  { label: 'Новое', value: 'newest' },
  { label: 'Цена: по возрастанию', value: 'price-asc' },
  { label: 'Цена: по убыванию', value: 'price-desc' },
  { label: 'Лучший рейтинг', value: 'rating' },
];

const SortSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'newest';
  
  const selectedOption = sortOptions.find((o) => o.value === currentSort) || sortOptions[1];
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

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    params.set('page', '1');
    router.push(`/catalog?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className={styles.sort} ref={ref}>
      <span className={styles.label}>Сортировать по:</span>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption.label}
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`${styles.option} ${option.value === currentSort ? styles.optionActive : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortSelect;