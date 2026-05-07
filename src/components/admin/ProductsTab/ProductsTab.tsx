// components/admin/ProductsTab/ProductsTab.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { Product } from '@/lib/data/products';
import { categories } from '@/lib/data/categories';
import { ProductForm } from './ProductForm';
import { ProductTable } from './ProductTable';
import { ProductFormData } from '.././types';
import styles from './ProductsTab.module.css';
import { allColors } from '@/lib/data/colors';

const PAGE_SIZE = 20;

export const ProductsTab = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<ProductFormData | null>(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        setLoading(true);
        const res = await fetch('/api/products?limit=1000');
        const data = await res.json();
        const cleaned = (data.data || []).map((p: any) => ({
            ...p,
            _id: String(p._id),
            colors: (p.colors || []).map((c: any) => ({ name: c.name, hex: c.hex })),
        }));
        setAllProducts(cleaned);
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Фильтрация
    const filtered = useMemo(() => {
        let result = allProducts;

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter((p) => p.name.toLowerCase().includes(q));
        }

        if (categoryFilter) {
            result = result.filter((p) => p.category === categoryFilter);
        }

        return result;
    }, [allProducts, search, categoryFilter]);

    // Пагинация
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const safePage = Math.min(page, totalPages || 1);
    const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

    // Сброс страницы при смене фильтра
    useEffect(() => {
        setPage(1);
    }, [search, categoryFilter]);

    const handleEdit = (product: Product) => {
        setEditData({
            name: product.name,
            price: String(product.price),
            discountPrice: product.discountPrice ? String(product.discountPrice) : '',
            description: product.description,
            details: product.details || [],
            category: product.category,
            colors: product.colors.map((c) => c.name),
            sizes: product.sizes,
            isNewProduct: product.isNew ?? false,
            isBestseller: product.isBestseller,
            images: product.images,
        });
        setEditingId(product._id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this product?')) return;
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
        fetchProducts();
    };

    const handleFormSubmit = async (formData: ProductFormData) => {
        const body = {
            name: formData.name,
            price: Number(formData.price),
            discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
            description: formData.description,
            details: formData.details || [],
            category: formData.category,
            colors: (formData.colors || []).map((name) => {
                const found = allColors.find((c) => c.name === name);
                return { name, hex: found?.hex || '#000000' };
            }),
            sizes: formData.sizes || [],
            isNewProduct: formData.isNewProduct,
            isBestseller: formData.isBestseller,
            images: formData.images || [],
        };

        const url = editingId ? `/api/products/${editingId}` : '/api/products';
        const method = editingId ? 'PUT' : 'POST';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        setShowForm(false);
        setEditingId(null);
        setEditData(null);
        fetchProducts();
    };

    return (
        <div className={styles.tab}>
            {/* Верхняя панель */}
            <div className={styles.toolbar}>
                <Button onClick={() => { setEditData(null); setEditingId(null); setShowForm(true); }}>
                    Add Product
                </Button>

                <div className={styles.filters}>
                    <Input
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className={styles.categorySelect}
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <span className={styles.count}>
                    {filtered.length} products
                    {categoryFilter && ` in ${categoryFilter}`}
                    {search && ` matching "${search}"`}
                </span>
            </div>

            {/* Таблица */}
            {loading ? (
                <p className={styles.loading}>Loading...</p>
            ) : (
                <>
                    <ProductTable
                        products={paginated}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    {/* Пагинация */}
                    {totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className={styles.pageBtn}
                            >
                                ←
                            </button>
                            <span className={styles.pageInfo}>
                                {safePage} / {totalPages}
                            </span>
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                                className={styles.pageBtn}
                            >
                                →
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Форма */}
            {showForm && (
                <ProductForm
                    initialData={editData || {
                        name: '', price: '', discountPrice: '', description: '', details: [],
                        category: categories[0], colors: [], sizes: [],
                        isNewProduct: false, isBestseller: false, images: [],
                    }}
                    editingId={editingId}
                    onSubmit={handleFormSubmit}
                    onCancel={() => { setShowForm(false); setEditingId(null); setEditData(null); }}
                />
            )}
        </div>
    );
};