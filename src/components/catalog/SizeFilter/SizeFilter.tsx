// components/catalog/SizeFilter/SizeFilter.tsx
'use client';
import { useState } from 'react';
import styles from './SizeFilter.module.css';

const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];

const SizeFilter = () => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (size: string) => {
        setSelected(prev => 
            prev.includes(size) 
                ? prev.filter(s => s !== size) 
                : [...prev, size]
        );
    };

    return (
        <div className={styles.sizes}>
            {sizes.map((size) => (
                <button
                    key={size}
                    className={`${styles.btn} ${selected.includes(size) ? styles.active : ''}`}
                    onClick={() => toggle(size)}
                >
                    {size}
                </button>
            ))}
        </div>
    );
};

export default SizeFilter;