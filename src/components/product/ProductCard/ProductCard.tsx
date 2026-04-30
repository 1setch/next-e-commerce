// components/product/ProductCard/ProductCard.tsx
import styles from './ProductCard.module.css';
import shirt from '@/../public/shirt.png';
import Image from 'next/image';

interface ProductCardProps {
    id: number;
    name: string;
    rating: string;
    price: string;
    discount?: string;
    image?: string;
}

const ProductCard = ({ name, rating, price }: ProductCardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.img_wrap}>
                <Image src={shirt} alt={name} className={styles.img}/>
            </div>
            <span className={styles.title}>{name}</span>
            <div className={styles.rating}>{rating}</div>
            <div className={styles.price}>${price}</div>
        </div>
    );
};

export default ProductCard;