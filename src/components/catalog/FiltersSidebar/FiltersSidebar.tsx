// components/catalog/FiltersSidebar/FiltersSidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterGroup from '../FilterGroup/FilterGroup';
import PriceRange from '../PriceRange/PriceRange';
import ColorFilter from '../ColorFilter/ColorFilter';
import SizeFilter from '../SizeFilter/SizeFilter';
import Button from '@/components/ui/Button/Button';
import { categories } from '@/lib/data/products';
import styles from './FiltersSidebar.module.css';

const FiltersSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Локальный стейт фильтров
  const [localCategory, setLocalCategory] = useState(searchParams.get('category') || '');
  const [localColor, setLocalColor] = useState<string[]>(
    searchParams.get('color') ? searchParams.get('color')!.split(',') : []
  );
  const [localSize, setLocalSize] = useState(searchParams.get('size') || '');
  const [localMinPrice, setLocalMinPrice] = useState(Number(searchParams.get('minPrice')) || 0);
  const [localMaxPrice, setLocalMaxPrice] = useState(Number(searchParams.get('maxPrice')) || 500);

  // Синхронизация с URL при внешних изменениях (стрелки браузера)
  useEffect(() => {
    setLocalCategory(searchParams.get('category') || '');
    setLocalColor(searchParams.get('color') ? searchParams.get('color')!.split(',') : []);
    setLocalSize(searchParams.get('size') || '');
    setLocalMinPrice(Number(searchParams.get('minPrice')) || 0);
    setLocalMaxPrice(Number(searchParams.get('maxPrice')) || 500);
  }, [searchParams]);

  // Применить все фильтры
  const applyFilters = () => {
    const params = new URLSearchParams();

    if (localCategory) params.set('category', localCategory);
    if (localColor.length > 0) params.set('color', localColor.join(','));
    if (localSize) params.set('size', localSize);
    if (localMinPrice > 0) params.set('minPrice', String(localMinPrice));
    if (localMaxPrice < 500) params.set('maxPrice', String(localMaxPrice));

    params.set('page', '1');

    const sort = searchParams.get('sort');
    if (sort) params.set('sort', sort);

    router.push(`/catalog?${params.toString()}`);
  };

  // Сбросить все
  const clearAll = () => {
    setLocalCategory('');
    setLocalColor([]);
    setLocalSize('');
    setLocalMinPrice(0);
    setLocalMaxPrice(500);
    router.push('/catalog');
  };

  const toggleColor = (color: string) => {
    setLocalColor((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const hasFilters = localCategory || localColor.length > 0 || localSize || localMinPrice > 0 || localMaxPrice < 500;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h3 className={styles.title}>Filters</h3>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 7H21M3 12H21M3 17H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      <FilterGroup title="Categories" defaultOpen={true}>
        <ul className={styles.list}>
          {categories.map((cat) => (
            <li key={cat}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={localCategory === cat}
                  onChange={() => setLocalCategory(localCategory === cat ? '' : cat)}
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Price" defaultOpen={true}>
        <PriceRange
          min={localMinPrice}
          max={localMaxPrice}
          onMinChange={setLocalMinPrice}
          onMaxChange={setLocalMaxPrice}
        />
      </FilterGroup>

      <FilterGroup title="Colors" defaultOpen={true}>
        <ColorFilter selected={localColor} onToggle={toggleColor} />
      </FilterGroup>

      <FilterGroup title="Size" defaultOpen={false}>
        <SizeFilter
          selected={localSize}
          onSelect={(size) => setLocalSize(size === localSize ? '' : size)}
        />
      </FilterGroup>

      <Button variant="default"  className={styles.applyBtn} onClick={applyFilters}>
        Apply Filter
      </Button>

      {hasFilters && (
        <Button variant="ghost"  className={styles.clearBtn} onClick={clearAll}>
          Clear All Filters
        </Button>
      )}
    </aside>
  );
};

export default FiltersSidebar;