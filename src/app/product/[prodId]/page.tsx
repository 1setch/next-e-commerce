// app/product/[id]/page.tsx
import Container from '@/components/layout/Container/Container';
import ProductInfo from '@/components/product/ProductInfo/ProductInfo';
import ProductGallery from '@/components/product/ProductGallery/ProductGallery';
import styles from "./page.module.css"

const ProductPage = () => {
    return (
        <section>
            <Container>
                <div className={styles.product}>
                    <ProductGallery />
                    <ProductInfo />
                </div>
                <div></div>  {/* второй блок — пока пропускаем */}
                <div></div>  {/* третий блок — рекомендованные */}
            </Container>
        </section>
    );
};

export default ProductPage;