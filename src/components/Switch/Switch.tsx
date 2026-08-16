import { useId, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useControllableState } from '../../hooks/useControllableState';
import styles from './Switch.module.css';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  /** Coloca o controle depois do texto — padrão de linha de configuração. */
  labelFirst?: boolean;
  name?: string;
  value?: string;
  id?: string;
  className?: string;
  'aria-label'?: string;
}

/**
 * Switch aplica a mudança na hora (diferente de Checkbox, que espera um "Salvar").
 * Por isso é um button com role="switch", não um input de formulário —
 * quando precisa ir junto no submit, um hidden input carrega o valor.
 */
export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  description,
  disabled,
  labelFirst = false,
  name,
  value = 'on',
  id: idProp,
  className,
  ...rest
}: SwitchProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const [isChecked, setChecked] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <span
      className={cn(styles.root, labelFirst && styles.reverse, className)}
      data-disabled={disabled || undefined}
    >
      <button
        {...rest}
        type="button"
        role="switch"
        id={id}
        disabled={disabled}
        aria-checked={isChecked}
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        className={styles.track}
        onClick={() => setChecked(!isChecked)}
      >
        <span className={styles.thumb} />
      </button>

      {name && <input type="hidden" name={name} value={isChecked ? value : ''} />}

      {(label || description) && (
        <span className={styles.text}>
          {/* <button> e um elemento rotulavel, entao clicar no texto aciona o switch. */}
          {label && (
            <label id={labelId} htmlFor={id} className={styles.label}>
              {label}
            </label>
          )}
          {description && (
            <span id={descriptionId} className={styles.description}>
              {description}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
