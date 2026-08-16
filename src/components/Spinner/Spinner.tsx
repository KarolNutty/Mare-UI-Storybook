import { cn } from '../../lib/cn';
import styles from './Spinner.module.css';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  /** Anunciado por leitores de tela. Passe null para spinners puramente decorativos. */
  label?: string | null;
  className?: string;
}

export function Spinner({ size = 'md', label = 'Carregando', className }: SpinnerProps) {
  return (
    <span
      className={cn(styles.wrapper, className)}
      role={label ? 'status' : undefined}
      aria-hidden={label ? undefined : true}
    >
      <svg
        className={cn(styles.svg, styles[size])}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          className={styles.track}
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className={styles.head}
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
      {label ? <span className="mare-sr-only">{label}</span> : null}
    </span>
  );
}
