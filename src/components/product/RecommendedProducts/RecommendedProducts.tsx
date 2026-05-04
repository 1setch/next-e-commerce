import { mockProducts } from '@/lib/data/products'; // временно, пока не переедем на БД полностью
import ProductSection from '@/components/home/ProductSection/ProductSection';

interface RecommendedProductsProps {
  category: string;
  currentProductId: string;
}

// TODO: заменить на запрос к API
const RecommendedProducts = ({ category, currentProductId }: RecommendedProductsProps) => {
  const recommended = mockProducts
    .filter((p) => p.category === category && String(p._id) !== currentProductId)
    .slice(0, 4);

  if (recommended.length === 0) return null;

  return <ProductSection title="You might also like" products={recommended as any} />;
};

export default RecommendedProducts;