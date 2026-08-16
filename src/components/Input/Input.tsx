import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Field } from '../Field';
import styles from './Input.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showOptional?: boolean;
  /** Ícone ou símbolo à esquerda (decorativo). */
  startAdornment?: ReactNode;
  /** Ícone ou símbolo à direita (decorativo). */
  endAdornment?: ReactNode;
  /** Classe aplicada ao container do campo, não ao <input>. */
  fieldClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    hint,
    error,
    size = 'md',
    required,
    showOptional,
    startAdornment,
    endAdornment,
    className,
    fieldClassName,
    id,
    ...rest
  },
  ref,
) {
  return (
    <Field
      label={label}
      hint={hint}
      error={error}
      required={required}
      showOptional={showOptional}
      id={id}
      className={fieldClassName}
    >
      {(fieldProps) => (
        <div className={styles.wrapper}>
          {startAdornment && (
            <span className={cn(styles.adornment, styles.adornmentStart)} aria-hidden="true">
              {startAdornment}
            </span>
          )}
          <input
            {...rest}
            {...fieldProps}
            ref={ref}
            required={required}
            className={cn(
              styles.control,
              size !== 'md' && styles[size],
              startAdornment && styles.withStart,
              endAdornment && styles.withEnd,
              className,
            )}
          />
          {endAdornment && (
            <span className={cn(styles.adornment, styles.adornmentEnd)} aria-hidden="true">
              {endAdornment}
            </span>
          )}
        </div>
      )}
    </Field>
  );
});
