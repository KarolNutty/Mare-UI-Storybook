import {
  forwardRef,
  useEffect,
  useRef,
  type InputHTMLAttributes,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  /** Linha de apoio abaixo do rótulo. */
  description?: ReactNode;
  /** Estado parcial — "alguns filhos marcados". Sobrepõe a aparência de checked. */
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, indeterminate = false, className, disabled, ...rest },
  forwardedRef,
) {
  const innerRef = useRef<HTMLInputElement | null>(null);

  // indeterminate só existe via DOM property — não há atributo HTML equivalente.
  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label className={cn(styles.root, className)} data-disabled={disabled || undefined}>
      <span className={styles.box}>
        <input
          {...rest}
          type="checkbox"
          disabled={disabled}
          className={styles.input}
          ref={(node) => {
            innerRef.current = node;
            if (typeof forwardedRef === 'function') forwardedRef(node);
            else if (forwardedRef)
              (forwardedRef as MutableRefObject<HTMLInputElement | null>).current = node;
          }}
        />
        <span className={styles.visual} aria-hidden="true">
          <svg
            className={cn(styles.mark, styles.checkMark)}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            focusable="false"
          >
            <path
              d="m2.5 6.2 2.2 2.3 4.8-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className={cn(styles.mark, styles.dashMark)}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            focusable="false"
          >
            <path d="M3 6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </span>

      {(label || description) && (
        <span className={styles.text}>
          {label}
          {description && <span className={styles.description}>{description}</span>}
        </span>
      )}
    </label>
  );
});
