import { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Input.module.css';

type InputVariant = 'default' | 'outline' | 'filled';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  icon?: ReactNode;
  error?: string;
  helperText?: string;
  variant?: InputVariant;
  fullWidth?: boolean;
}

const Input = ({
  icon,
  error,
  helperText,
  variant = 'default',
  fullWidth = false,
  className = '',
  ...props
}: InputProps) => {
  return (
    <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
      <div className={styles.inputContainer}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          className={`${styles.input} ${styles[variant]} ${icon ? styles.withIcon : ''} ${error ? styles.error : ''}`}
          {...props}
        />
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
      {helperText && !error && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
};

export default Input;