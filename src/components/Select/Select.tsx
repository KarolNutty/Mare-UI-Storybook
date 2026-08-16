import { forwardRef, type ReactNode, type SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { Field } from '../Field';
import inputStyles from '../Input/Input.module.css';
import styles from './Select.module.css';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showOptional?: boolean;
  /** Lista de opções. Alternativamente, passe <option> como children. */
  options?: SelectOption[];
  /** Opção vazia inicial, útil quando não há valor padrão sensato. */
  placeholder?: string;
  fieldClassName?: string;
}

/**
 * Select nativo, de propósito: no mobile o seletor do sistema é mais rápido e
 * mais acessível que qualquer listbox customizada.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    hint,
    error,
    size = 'md',
    required,
    showOptional,
    options,
    placeholder,
    className,
    fieldClassName,
    id,
    children,
    defaultValue,
    value,
    ...rest
  },
  ref,
) {
  const isUncontrolledWithPlaceholder =
    placeholder !== undefined && value === undefined && defaultValue === undefined;

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
          <select
            {...rest}
            {...fieldProps}
            ref={ref}
            required={required}
            value={value}
            defaultValue={isUncontrolledWithPlaceholder ? '' : defaultValue}
            className={cn(
              inputStyles.control,
              styles.select,
              size !== 'md' && inputStyles[size],
              className,
            )}
          >
            {placeholder !== undefined && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options?.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
            {children}
          </select>
          <span className={styles.chevron} aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" focusable="false">
              <path
                d="M2.5 4.5 6 8l3.5-3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      )}
    </Field>
  );
});
