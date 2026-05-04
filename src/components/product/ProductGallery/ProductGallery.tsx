// components/product/ProductGallery/ProductGallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProductGallery.module.css';
import shirt from '@/../public/shirt.png';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayImages = images.length > 0 ? images : [shirt.src];

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbnails}>
        {displayImages.map((img, index) => (
          <button
            key={index}
            className={`${styles.thumb} ${index === activeIndex ? styles.thumbActive : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <Image src={img} alt={`${name} ${index + 1}`} width={152} height={167} />
          </button>
        ))}
      </div>
      <div className={styles.mainImage}>
        <Image
          src={displayImages[activeIndex]}
          alt={name}
          fill
          className={styles.img}
        />
      </div>
    </div>
  );
};

export default ProductGallery;