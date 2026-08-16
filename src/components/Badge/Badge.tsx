import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import styles from './Badge.module.css';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Formato arredondado, para contagens e status. */
  pill?: boolean;
  /** Ponto colorido antes do texto — útil em status de sistema. */
  dot?: boolean;
  children: ReactNode;
}

export function Badge({
  tone = 'neutral',
  pill = false,
  dot = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      {...rest}
      data-tone={tone}
      className={cn(styles.badge, styles[tone], pill && styles.pill, className)}
    >
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
}
