// components/catalog/Breadcrumbs/Breadcrumbs.tsx
import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = () => {
    return (
        <div className={styles.breadcrumbs}>
            <Link href="/" className={styles.link}>Home</Link>
            <span className={styles.separator}>›</span>
            <Link href="/catalog" className={styles.link}>Shop</Link>
            <span className={styles.separator}>›</span>
            <span className={styles.current}>Collection</span>
        </div>
    );
};

export default Breadcrumbs;