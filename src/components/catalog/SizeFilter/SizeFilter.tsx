// components/catalog/SizeFilter/SizeFilter.tsx
'use client';

import { allSizes } from '@/lib/data/products';
import styles from './SizeFilter.module.css';

interface SizeFilterProps {
  selected: string;
  onSelect: (size: string) => void;
}

const SizeFilter = ({ selected, onSelect }: SizeFilterProps) => {
  return (
    <div className={styles.sizes}>
      {allSizes.map((size) => (
        <button
          key={size}
          className={`${styles.btn} ${size === selected ? styles.active : ''}`}
          onClick={() => onSelect(size === selected ? '' : size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default SizeFilter;