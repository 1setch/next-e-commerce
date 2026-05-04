// components/catalog/ColorFilter/ColorFilter.tsx
'use client';

import { allColors } from '@/lib/data/colors';
import styles from './ColorFilter.module.css';

interface ColorFilterProps {
  selected: string[];
  onToggle: (color: string) => void;
}

const ColorFilter = ({ selected, onToggle }: ColorFilterProps) => {
  return (
    <div className={styles.colors}>
      {allColors.map((color) => (
        <button
          key={color.hex}
          className={`${styles.btn} ${selected.includes(color.name) ? styles.active : ''}`}
          style={{ backgroundColor: color.hex }}
          onClick={() => onToggle(color.name)}
          title={color.name}
        >
          {selected.includes(color.name) && (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path
                d="M1 4L4.5 7.5L11 1"
                stroke={color.name === 'White' || color.name === 'Beige' ? 'black' : 'white'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
};

export default ColorFilter;