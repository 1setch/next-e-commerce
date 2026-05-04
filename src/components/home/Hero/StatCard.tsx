
import styles from './Hero.module.css';

interface StatCardProps {
  value: string;    
  label: string;     
}

const StatCard = ({ value, label }: StatCardProps) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.number}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default StatCard;