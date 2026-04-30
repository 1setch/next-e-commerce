// components/product/ProductGallery/ProductGallery.tsx
import styles from './ProductGallery.module.css';
import shirt from '@/../public/shirt.png';
import Image from 'next/image';

const ProductGallery = () => {
    // Пока статично, потом заменишь на массив картинок из пропсов
    const thumbnails = [shirt, shirt, shirt];

    return (
        <div className={styles.gallery}>
            <div className={styles.thumbnails}>
                {thumbnails.map((thumb, index) => (
                    <button
                        key={index}
                        className={`${styles.thumb} ${index === 0 ? styles.thumbActive : ''}`}
                    >
                        <Image src={thumb} alt={`Thumbnail ${index + 1}`} />
                    </button>
                ))}
            </div>
            <div className={styles.mainImage}>
                <Image src={shirt} alt="Product" fill className={styles.img} />
            </div>
        </div>
    );
};

export default ProductGallery;