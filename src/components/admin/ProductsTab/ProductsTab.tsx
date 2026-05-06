'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button/Button';
import { Product } from '@/lib/data/products';
import { allColors } from '@/lib/data/colors';
import { ProductTable } from './ProductTable';
import { ProductForm } from './ProductForm';
import { ProductFormData, emptyProductForm } from '../types';
import styles from './ProductsTab.module.css';

export const ProductsTab = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<ProductFormData>(emptyProductForm);

    const fetchProducts = async () => {
        const res = await fetch('/api/products?limit=100');
        const data = await res.json();
        const cleaned = data.data.map((p: any) => ({
            ...p,
            _id: String(p._id),
            colors: p.colors.map((c: any) => ({ name: c.name, hex: c.hex })),
        }));
        setProducts(cleaned);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const resetForm = () => {
        setFormData(emptyProductForm);
        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = async (form: ProductFormData) => {
        const body = {
            name: form.name,
            price: Number(form.price),
            discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
            description: form.description,
            details: form.details,
            category: form.category,
            colors: form.colors.map((name) => {
                const found = allColors.find((c) => c.name === name);
                return { name, hex: found?.hex || '#000000' };
            }),
            sizes: form.sizes,
            isNewProduct: form.isNewProduct,
            isBestseller: form.isBestseller,
            images: form.images,
        };

        const url = editingId ? `/api/products/${editingId}` : '/api/products';
        const method = editingId ? 'PUT' : 'POST';

        await fetch(url, { 
            method, 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(body) 
        });
        resetForm();
        fetchProducts();
    };

    const handleEdit = (product: Product) => {
        setFormData({
            name: product.name,
            price: String(product.price),
            discountPrice: product.discountPrice ? String(product.discountPrice) : '',
            description: product.description,
            details: product.details || [],
            category: product.category,
            colors: product.colors.map((c) => c.name),
            sizes: product.sizes,
            isNewProduct: product.isNew,
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

    return (
        <div className={styles.productsTab}>
            <div className={styles.header}>
                <h3>Products</h3>
                <Button onClick={() => setShowForm(true)}>+ Add Product</Button>
            </div>
            
            {showForm && (
                <ProductForm 
                    initialData={formData}
                    editingId={editingId}
                    onSubmit={handleSubmit}
                    onCancel={resetForm}
                />
            )}
            
            <ProductTable 
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};