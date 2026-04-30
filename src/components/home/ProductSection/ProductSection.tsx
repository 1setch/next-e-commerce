import Container from '@/components/layout/Container/Container';
import styles from './ProductSection.module.css'
import ProductCard from '@/components/product/ProductCard/ProductCard';
import Button from '@/components/ui/Button/Button';

interface ProductSectionProps {
    title: string;
}

const ProductSection = ({ title }: ProductSectionProps) => {
    return (
        <Container>
            <section className={styles.prod_section}>
                <h3 className={styles.title}>{title} </h3>
                <div className={styles.prods}>
                    <ProductCard id={1} name="T-SHIRT WITH TAPE DETAILS" rating="4.5/5" price="120" />
                    <ProductCard id={2} name="SKINNY FIT JEANS" rating="3.5/5" price="240" />
                    <ProductCard id={3} name="CHECKERED SHIRT" rating="4.5/5" price="180" />
                    <ProductCard id={4} name="SLEEVE STRIPED T-SHIRT" rating="4.5/5" price="130" />
                </div>
                <Button variant='light' className={styles.btn}>
                    View All
                </Button>
            </section>
        </Container>
    );
};

export default ProductSection;