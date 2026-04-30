// components/catalog/Pagination/Pagination.tsx
import styles from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const Pagination = ({ currentPage = 1, totalPages = 10 }: PaginationProps) => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages.push(1);
        if (currentPage > 3) pages.push('...');
        
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        
        for (let i = start; i <= end; i++) pages.push(i);
        
        if (currentPage < totalPages - 2) pages.push('...');
        pages.push(totalPages);
    }

    return (
        <div className={styles.pagination}>
            <button className={styles.btn} disabled={currentPage === 1}>
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                    <path d="M6 1L1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </button>
            {pages.map((page, i) => (
                <button
                    key={i}
                    className={`${styles.btn} ${page === currentPage ? styles.active : ''} ${page === '...' ? styles.dots : ''}`}
                    disabled={page === '...'}
                >
                    {page}
                </button>
            ))}
            <button className={styles.btn} disabled={currentPage === totalPages}>
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                    <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </button>
        </div>
    );
};

export default Pagination;