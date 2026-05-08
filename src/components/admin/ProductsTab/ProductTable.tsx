'use client';

import Button from '@/components/ui/Button/Button';
import { Product } from '@/lib/data/products';
import styles from './ProductTable.module.css';

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
}

export const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Превью</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Категория</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>
                                <img src={product.images[0] || '/shirt.png'} alt="" width={50} height={50} />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.price}{' ₽'}</td>
                            <td>{product.category}</td>
                            <td >
                                <div className={styles.actions}>
                                    <Button variant="ghost" onClick={() => onEdit(product)}>Редактировать</Button>
                                    <Button variant="ghost" onClick={() => onDelete(product._id)}>Удалить</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};