import { forwardRef, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { Field } from '../Field';
import inputStyles from '../Input/Input.module.css';
import styles from './Textarea.module.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  showOptional?: boolean;
  /** Trava o redimensionamento manual. */
  resizable?: boolean;
  fieldClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    hint,
    error,
    required,
    showOptional,
    resizable = true,
    className,
    fieldClassName,
    id,
    rows = 4,
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
        <textarea
          {...rest}
          {...fieldProps}
          ref={ref}
          rows={rows}
          required={required}
          className={cn(
            inputStyles.control,
            styles.textarea,
            !resizable && styles.noResize,
            className,
          )}
        />
      )}
    </Field>
  );
});
