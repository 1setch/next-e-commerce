import { ComponentPropsWithoutRef, ReactNode } from 'react';
import styles from './Button.module.css';


interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  variant?: 'default' | 'light' | 'outline' | 'ghost';
  className?: string;
};

const Button = ({
  children,
  variant = 'default',
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;