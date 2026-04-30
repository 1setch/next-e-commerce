// components/product/RecommendedProducts/RecommendedProducts.tsx
import { mockProducts, Product } from '@/lib/data/products';
import ProductSection from '@/components/home/ProductSection/ProductSection';

interface RecommendedProductsProps {
  category: string;
  currentProductId: number;
}

const RecommendedProducts = ({ category, currentProductId }: RecommendedProductsProps) => {
  const recommended = mockProducts
    .filter((p) => p.category === category && p.id !== currentProductId)
    .slice(0, 4);

  if (recommended.length === 0) return null;

  return (
    <ProductSection title="You might also like" products={recommended} />
  );
};

export default RecommendedProducts;