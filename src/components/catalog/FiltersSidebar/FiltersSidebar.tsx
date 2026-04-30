// components/catalog/FiltersSidebar/FiltersSidebar.tsx
import FilterGroup from '../FilterGroup/FilterGroup';
import PriceRange from '../PriceRange/PriceRange';
import ColorFilter from '../ColorFilter/ColorFilter';
import SizeFilter from '../SizeFilter/SizeFilter';
import Button from '@/components/ui/Button/Button';
import styles from './FiltersSidebar.module.css';

const categories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];

const FiltersSidebar = () => {
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
                                <input type="checkbox" /> {cat}
                            </label>
                        </li>
                    ))}
                </ul>
            </FilterGroup>
            
            <FilterGroup title="Price" defaultOpen={true}>
                <PriceRange />
            </FilterGroup>
            
            <FilterGroup title="Colors" defaultOpen={true}>
                <ColorFilter />
            </FilterGroup>
            
            <FilterGroup title="Size" defaultOpen={false}>
                <SizeFilter />
            </FilterGroup>
            
            <Button variant="default" className={styles.applyBtn}>
                Apply Filter
            </Button>
        </aside>
    );
};

export default FiltersSidebar;