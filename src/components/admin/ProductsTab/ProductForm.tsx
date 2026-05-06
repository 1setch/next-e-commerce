'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { allColors } from '@/lib/data/colors';
import { categories } from '@/lib/data/categories';
import { allSizes } from '@/lib/data/sizes';
import styles from './ProductForm.module.css';

interface ProductFormData {
    name: string;
    price: string;
    discountPrice: string;
    description: string;
    details: string[];
    category: string;
    colors: string[];
    sizes: string[];
    isNewProduct: boolean;
    isBestseller: boolean;
    images: string[];
}

interface ProductFormProps {
    initialData: ProductFormData;
    editingId: string | null;
    onSubmit: (data: ProductFormData) => Promise<void>;
    onCancel: () => void;
}

export const ProductForm = ({ initialData, editingId, onSubmit, onCancel }: ProductFormProps) => {
    const [form, setForm] = useState<ProductFormData>(initialData);
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        setForm((prev) => ({ ...prev, images: [...prev.images, ...data.urls] }));
        setUploading(false);
    };

    const toggleArrayItem = (arr: string[], item: string): string[] => {
        return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(form);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h3>{editingId ? 'Edit Product' : 'New Product'}</h3>
                    <button className={styles.closeBtn} onClick={onCancel}>✕</button>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input 
                        helperText="Name" 
                        value={form.name} 
                        onChange={(e) => setForm({ ...form, name: e.target.value })} 
                        required 
                    />

                    <div className={styles.row}>
                        <Input 
                            helperText="Price" 
                            type="number" 
                            value={form.price} 
                            onChange={(e) => setForm({ ...form, price: e.target.value })} 
                            required 
                        />
                        <Input 
                            helperText="Discount Price" 
                            type="number" 
                            value={form.discountPrice} 
                            onChange={(e) => setForm({ ...form, discountPrice: e.target.value })} 
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Description</label>
                        <textarea 
                            value={form.description} 
                            onChange={(e) => setForm({ ...form, description: e.target.value })} 
                            rows={4} 
                            required 
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Product Details (one per line)</label>
                        <textarea
                            value={form.details.join('\n')}
                            onChange={(e) => setForm({ ...form, details: e.target.value.split('\n').filter(Boolean) })}
                            rows={4}
                            placeholder="100% organic cotton\nMachine washable at 30°C\nRegular fit\nImported"
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Category</label>
                        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label>Colors</label>
                        <div className={styles.chips}>
                            {allColors.map((color) => (
                                <button
                                    key={color.name}
                                    type="button"
                                    className={`${styles.chip} ${form.colors.includes(color.name) ? styles.chipActive : ''}`}
                                    onClick={() => setForm({ ...form, colors: toggleArrayItem(form.colors, color.name) })}
                                >
                                    <span className={styles.colorDot} style={{ backgroundColor: color.hex }} />
                                    {color.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label>Sizes</label>
                        <div className={styles.chips}>
                            {allSizes.map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    className={`${styles.chip} ${form.sizes.includes(size) ? styles.chipActive : ''}`}
                                    onClick={() => setForm({ ...form, sizes: toggleArrayItem(form.sizes, size) })}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.checkboxes}>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={form.isNewProduct} 
                                onChange={(e) => setForm({ ...form, isNewProduct: e.target.checked })} 
                            />
                            New Arrival
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={form.isBestseller} 
                                onChange={(e) => setForm({ ...form, isBestseller: e.target.checked })} 
                            />
                            Bestseller
                        </label>
                    </div>

                    <div className={styles.field}>
                        <label>Images</label>
                        <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                        {uploading && <span className={styles.uploading}>Uploading...</span>}
                        <div className={styles.imagePreviews}>
                            {form.images.map((url, i) => (
                                <div key={i} className={styles.imagePreview}>
                                    <img src={url} alt="" width={80} height={80} />
                                    <button type="button" onClick={() => setForm({ ...form, images: form.images.filter((_, j) => j !== i) })}>✕</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <Button type="submit">{editingId ? 'Update' : 'Create'}</Button>
                        <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};