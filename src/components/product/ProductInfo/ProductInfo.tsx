// components/product/ProductInfo/ProductInfo.tsx

'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button/Button';
import QuantitySelector from '@/components/ui/QuantitySelector/QuantitySelector';
import { useCartStore } from '@/store/cartStore';
import { ProductColor } from '@/lib/data/products';
import styles from './ProductInfo.module.css';
import { useToastStore } from '@/store/toastStore';

interface ProductInfoProps {
    id: string;
    name: string;
    rating: number;
    reviewCount: number;
    price: number;
    discountPrice?: number;
    originalPrice: number;
    description: string;
    colors: ProductColor[];
    sizes: string[];
    image?: string;
}

const ProductInfo = ({
    id,
    name,
    rating,
    reviewCount,
    price,
    discountPrice,
    originalPrice,
    description,
    colors,
    sizes,
    image,
}: ProductInfoProps) => {
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state) => state.addItem);
    const addToast = useToastStore((state) => state.addToast);

    const hasDiscount = !!discountPrice && discountPrice < originalPrice;
    const discountPercent = hasDiscount
        ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
        : 0;
    const syncToServer = useCartStore((state) => state.syncToServer);

    const handleAddToCart = () => {
        addItem({
            productId: id,
            name,
            price,
            image: image || '',
            color: colors[selectedColor].name,
            colorHex: colors[selectedColor].hex,
            size: selectedSize,
            quantity,
        });
        syncToServer();
        addToast('Товар добавлен в корзину!', 'success');
    };

    return (
        <div className={styles.prod_info}>
            <div>
                <h3 className={styles.title}>{name}</h3>
                <div className={styles.rating}>
                    <span className={styles.ratingBtn}>{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))} </span>{rating}
                    <span className={styles.reviewCount}>({reviewCount} отзывов)</span>
                </div>

                <div className={styles.priceBlock}>
                    <span className={styles.price}>{price} {' ₽'}</span>
                    {hasDiscount && (
                        <>
                            <span className={styles.originalPrice}>{originalPrice} {' ₽'}</span>
                            <span className={styles.discount}>-{discountPercent}%</span>
                        </>
                    )}
                </div>

                <p className={styles.description}>{description}</p>
            </div>

            <hr className={styles.hrline} />

            <div>
                <span className={styles.optionLabel}>Цвет</span>
                <div className={styles.colors}>
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            className={`${styles.colorBtn} ${index === selectedColor ? styles.colorBtnActive : ''}`}
                            style={{ backgroundColor: color.hex }}
                            onClick={() => setSelectedColor(index)}
                            title={color.name}
                        >
                            {index === selectedColor && (
                                <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                    <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <hr className={styles.hrline} />

            <div>
                <span className={styles.optionLabel}>Размер</span>
                <div className={styles.sizes}>
                    {sizes.map((size) => (
                        <button
                            key={size}
                            className={`${styles.sizeBtn} ${size === selectedSize ? styles.sizeBtnActive : ''}`}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <hr className={styles.hrline} />

            <div className={styles.addtocart}>
                <QuantitySelector value={quantity} onChange={setQuantity} />
                <Button className={styles.btn} onClick={handleAddToCart}>
                    Добавить в корзину
                </Button>
            </div>
        </div>
    );
};

export default ProductInfo;