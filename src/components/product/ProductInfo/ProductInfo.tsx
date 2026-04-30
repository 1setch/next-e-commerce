// components/product/ProductInfo/ProductInfo.tsx
import Button from '@/components/ui/Button/Button';
import styles from './ProductInfo.module.css';
import QuantitySelector from '@/components/ui/QuantitySelector/QuantitySelector';

const ProductInfo = () => {
    // Пока хардкод, потом из пропсов
    const hasDiscount = true;
    const price = 260;
    const originalPrice = 300;
    const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);
    
    const colors = ['#4A3F35', '#2E4A2E', '#1A1A2E'];
    const selectedColor = 0;
    
    const sizes = ['Small', 'Medium', 'Large', 'X-Large'];
    const selectedSize = 'Large';

    return (
        <div className={styles.prod_info}>
            <div>
                <h3 className={styles.title}>One Life Graphic T-shirt</h3>
                <div className={styles.rating}>
                    {/* Звёзды пока текстом, потом компонент StarRating */}
                    ⭐⭐⭐⭐☆ 4.5/5
                </div>
                
                <div className={styles.priceBlock}>
                    <span className={styles.price}>${price}</span>
                    {hasDiscount && (
                        <>
                            <span className={styles.originalPrice}>${originalPrice}</span>
                            <span className={styles.discount}>-{discountPercent}%</span>
                        </>
                    )}
                </div>
                
                <p className={styles.description}>
                    This graphic t-shirt which is perfect for any occasion. 
                    Crafted from a soft and breathable fabric, it offers superior comfort and style.
                </p>
            </div>
            
            <hr className={styles.hrline} />
            
            <div>
                <span className={styles.optionLabel}>Select Colors</span>
                <div className={styles.colors}>
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            className={`${styles.colorBtn} ${index === selectedColor ? styles.colorBtnActive : ''}`}
                            style={{ backgroundColor: color }}
                        >
                            {index === selectedColor && (
                                <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                    <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            </div>
            
            <hr className={styles.hrline} />
            
            <div>
                <span className={styles.optionLabel}>Choose Size</span>
                <div className={styles.sizes}>
                    {sizes.map((size) => (
                        <button
                            key={size}
                            className={`${styles.sizeBtn} ${size === selectedSize ? styles.sizeBtnActive : ''}`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>
            
            <hr className={styles.hrline} />
            
            <div className={styles.addtocart}>
                <QuantitySelector />
                <Button className={styles.btn}>Add to Cart</Button>
            </div>
        </div>
    );
};

export default ProductInfo;