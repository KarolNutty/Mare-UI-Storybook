import { useId, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import styles from './Field.module.css';

export interface FieldRenderProps {
  /** id do controle — já ligado ao <label>. */
  id: string;
  'aria-describedby': string | undefined;
  'aria-invalid': true | undefined;
  'aria-required': true | undefined;
}

export interface FieldProps {
  label?: ReactNode;
  /** Texto de apoio abaixo do controle. Some quando há erro. */
  hint?: ReactNode;
  /** Mensagem de erro. Presença dela marca o controle como inválido. */
  error?: ReactNode;
  required?: boolean;
  /** Mostra "opcional" ao lado do rótulo — mais honesto que marcar tudo com asterisco. */
  showOptional?: boolean;
  id?: string;
  className?: string;
  children: (props: FieldRenderProps) => ReactNode;
}

/**
 * Cuida da parte chata e sempre esquecida de um campo de formulário:
 * ligar label, hint e erro ao controle pelos ids certos.
 */
export function Field({
  label,
  hint,
  error,
  required,
  showOptional,
  id: idProp,
  className,
  children,
}: FieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  const describedBy = [error ? errorId : null, hint && !error ? hintId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cn(styles.field, className)}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          )}
          {!required && showOptional && <span className={styles.optional}>opcional</span>}
        </label>
      )}

      {children({
        id,
        'aria-describedby': describedBy || undefined,
        'aria-invalid': error ? true : undefined,
        'aria-required': required || undefined,
      })}

      {hint && !error && (
        <p className={styles.hint} id={hintId}>
          {hint}
        </p>
      )}

      {error && (
        <p className={styles.error} id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
