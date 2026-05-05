// components/ui/Skeleton/Skeleton.tsx
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

const Skeleton = ({ width = '100%', height = '20px', borderRadius = '8px', className = '' }: SkeletonProps) => {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{ width, height, borderRadius }}
    />
  );
};

export default Skeleton;