// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/layout/Container/Container';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { Product } from '@/lib/data/products';
import { allColors } from '@/lib/data/colors';
import { categories } from '@/lib/data/categories';
import { allSizes } from '@/lib/data/sizes';
import styles from './page.module.css';

interface ProductForm {
    name: string;
    price: string;
    discountPrice: string;
    description: string;
    category: string;
    colors: string[];
    sizes: string[];
    isNewProduct: boolean;
    isBestseller: boolean;
    images: string[];
}

const emptyForm: ProductForm = {
    name: '',
    price: '',
    discountPrice: '',
    description: '',
    category: categories[0],
    colors: [],
    sizes: [],
    isNewProduct: false,
    isBestseller: false,
    images: [],
};

const AdminPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<ProductForm>(emptyForm);
    const [uploading, setUploading] = useState(false);
    // Добавь стейты в начало компонента
    const [activeView, setActiveView] = useState<'products' | 'questions'>('products');
    const [questions, setQuestions] = useState<any[]>([]);
    const [answerText, setAnswerText] = useState<Record<string, string>>({});

    // Загрузка вопросов
    const fetchQuestions = async () => {
        const prods = await fetch('/api/products?limit=100').then(r => r.json());

        const allQuestions: any[] = [];
        for (const p of prods.data) {
            const res = await fetch(`/api/questions?productId=${p._id}`);
            const qs = await res.json();
            if (Array.isArray(qs)) {
                qs.forEach((q: any) => allQuestions.push({ ...q, productName: p.name }));
            }
        }
        setQuestions(allQuestions);
    };

    useEffect(() => {
        if (activeView === 'questions') fetchQuestions();
    }, [activeView]);

    const handleAnswer = async (questionId: string) => {
        await fetch(`/api/questions/${questionId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answer: answerText[questionId] }),
        });
        setAnswerText((prev) => ({ ...prev, [questionId]: '' }));
        fetchQuestions();
    };

    const fetchProducts = async () => {
        const res = await fetch('/api/products?limit=100');
        const data = await res.json();

        // Убираем _id из вложенных объектов
        const cleaned = data.data.map((p: any) => ({
            ...p,
            _id: String(p._id),
            colors: p.colors.map((c: any) => ({
                name: c.name,
                hex: c.hex,
            })),
        }));

        setProducts(cleaned);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
        setShowForm(false);
    };

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

        const body = {
            name: form.name,
            price: Number(form.price),
            discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
            description: form.description,
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
            body: JSON.stringify(body),
        });

        resetForm();
        fetchProducts();
    };

    const handleEdit = (product: Product) => {
        setForm({
            name: product.name,
            price: String(product.price),
            discountPrice: product.discountPrice ? String(product.discountPrice) : '',
            description: product.description,
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
        <section>
            <Container>
                <div className={styles.header}>
                    <div className={styles.viewTabs}>
                        <button
                            className={`${styles.viewTab} ${activeView === 'products' ? styles.viewTabActive : ''}`}
                            onClick={() => setActiveView('products')}
                        >Products</button>
                        <button
                            className={`${styles.viewTab} ${activeView === 'questions' ? styles.viewTabActive : ''}`}
                            onClick={() => setActiveView('questions')}
                        >Questions ({questions.filter(q => !q.answer).length})</button>
                    </div>
                    {activeView === 'products' && (
                        <Button onClick={() => { resetForm(); setShowForm(true); }}>Add Product</Button>
                    )}
                </div>


                {activeView === 'products' ? (
                    <>
                        {showForm && (
                            <div className={styles.modal}>
                                <div className={styles.modalContent}>
                                    <div className={styles.modalHeader}>
                                        <h3>{editingId ? 'Edit Product' : 'New Product'}</h3>
                                        <button className={styles.closeBtn} onClick={resetForm}>✕</button>
                                    </div>
                                    <form onSubmit={handleSubmit} className={styles.form}>
                                        <Input helperText="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />

                                        <div className={styles.row}>
                                            <Input helperText="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                                            <Input helperText="Discount Price" type="number" value={form.discountPrice} onChange={(e) => setForm({ ...form, discountPrice: e.target.value })} />
                                        </div>

                                        

                                        <div className={styles.field}>
                                            <label>Description</label>
                                            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} required />
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
                                                <input type="checkbox" checked={form.isNewProduct} onChange={(e) => setForm({ ...form, isNewProduct: e.target.checked })} />
                                                New Arrival
                                            </label>
                                            <label>
                                                <input type="checkbox" checked={form.isBestseller} onChange={(e) => setForm({ ...form, isBestseller: e.target.checked })} />
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
                                            <Button variant="outline" type="button" onClick={resetForm}>Cancel</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </>) : (/* Вопросы — отдельная секция, не внутри таблицы */
                    <div className={styles.questionsSection}>
                        <h3>Customer Questions</h3>
                        {questions.length === 0 ? (
                            <p className={styles.emptyText}>No questions yet</p>
                        ) : (
                            questions.map((q) => (
                                <div key={q._id} className={styles.questionCard}>
                                    <div className={styles.questionHeader}>
                                        <div>
                                            <span className={styles.questionProduct}>{q.productName}</span>
                                            <span className={styles.questionUser}>— {q.userName}</span>
                                        </div>
                                        <span className={`${styles.questionStatus} ${q.answer ? styles.statusAnswered : styles.statusPending}`}>
                                            {q.answer ? 'Answered' : 'Pending'}
                                        </span>
                                    </div>
                                    <p className={styles.questionText}>{q.question}</p>
                                    {q.answer ? (
                                        <div className={styles.answerBlock}>
                                            <span className={styles.answerLabel}>Answer:</span>
                                            <p>{q.answer}</p>
                                        </div>
                                    ) : (
                                        <div className={styles.answerForm}>
                                            <textarea
                                                value={answerText[q._id] || ''}
                                                onChange={(e) => setAnswerText({ ...answerText, [q._id]: e.target.value })}
                                                placeholder="Write an answer..."
                                                rows={3}
                                            />
                                            <Button onClick={() => handleAnswer(q._id)} disabled={!answerText[q._id]?.trim()}>
                                                Answer
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <img src={product.images[0] || '/shirt.png'} alt="" width={50} height={50} />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td className={styles.actions}>
                                        <Button variant="ghost" onClick={() => handleEdit(product)}>Edit</Button>
                                        <Button variant="ghost" onClick={() => handleDelete(product._id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </Container>
        </section>
    );
};

export default AdminPage;