// components/catalog/Breadcrumbs/Breadcrumbs.tsx

import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

const defaultItems: BreadcrumbItem[] = [
  { label: 'Catalog', href: '/catalog' },
];

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const crumbs = items || defaultItems;

  return (
    <div className={styles.breadcrumbs}>
      <Link href="/" className={styles.link}>Главная</Link>
      {crumbs.map((item, index) => (
        <span key={index}>
          <span className={styles.separator}>›</span>
          {item.href ? (
            <Link href={item.href} className={styles.link}>{item.label}</Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;