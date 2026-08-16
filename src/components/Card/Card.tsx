import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'outlined' | 'raised' | 'flat';
  /** Adiciona affordance de clique. Use com onClick + as="button" no consumidor. */
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'outlined', interactive = false, className, children, ...rest },
  ref,
) {
  return (
    <div
      {...rest}
      ref={ref}
      className={cn(
        styles.card,
        variant === 'raised' && styles.raised,
        variant === 'flat' && styles.flat,
        interactive && styles.interactive,
        className,
      )}
    >
      {children}
    </div>
  );
});

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Canto direito do cabeçalho: badge, menu, botão de ação. */
  action?: ReactNode;
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
  children,
  ...rest
}: CardHeaderProps) {
  return (
    <div {...rest} className={cn(styles.header, className)}>
      <div className={styles.headerText}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children}
      </div>
      {action}
    </div>
  );
}

export function CardBody({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={cn(styles.body, className)}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Alinha as ações à direita, como em diálogos. */
  align?: 'start' | 'end';
}

export function CardFooter({ align = 'start', className, children, ...rest }: CardFooterProps) {
  return (
    <div {...rest} className={cn(styles.footer, align === 'end' && styles.footerEnd, className)}>
      {children}
    </div>
  );
}
