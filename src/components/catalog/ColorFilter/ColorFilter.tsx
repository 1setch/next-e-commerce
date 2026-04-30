// components/catalog/ColorFilter/ColorFilter.tsx
'use client';
import { useState } from 'react';
import styles from './ColorFilter.module.css';

const colors = [
    { value: 'brown', hex: '#4A3F35' },
    { value: 'green', hex: '#2E4A2E' },
    { value: 'navy', hex: '#1A1A2E' },
    { value: 'red', hex: '#C41E3A' },
    { value: 'beige', hex: '#D4C4A8' },
    { value: 'black', hex: '#000000' },
    { value: 'white', hex: '#FFFFFF' },
    { value: 'gray', hex: '#808080' },
    { value: 'blue', hex: '#4169E1' },
    { value: 'pink', hex: '#FFB6C1' },
];

const ColorFilter = () => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (color: string) => {
        setSelected(prev => 
            prev.includes(color) 
                ? prev.filter(c => c !== color) 
                : [...prev, color]
        );
    };

    return (
        <div className={styles.colors}>
            {colors.map((color) => (
                <button
                    key={color.value}
                    className={`${styles.btn} ${selected.includes(color.value) ? styles.active : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => toggle(color.value)}
                    title={color.value}
                >
                    {selected.includes(color.value) && (
                        <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                            <path d="M1 4L4.5 7.5L11 1" 
                                stroke={color.value === 'white' || color.value === 'beige' ? 'black' : 'white'} 
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