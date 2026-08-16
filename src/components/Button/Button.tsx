import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Spinner } from '../Spinner';
import styles from './Button.module.css';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'subtle' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Mostra spinner e bloqueia o clique. */
  loading?: boolean;
  /** Texto anunciado enquanto carrega. Só usado em botões sem rótulo visível. */
  loadingLabel?: string;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  /** Botão quadrado só com ícone. Exige aria-label. */
  iconOnly?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'solid',
    size = 'md',
    loading = false,
    loadingLabel = 'Carregando',
    fullWidth = false,
    iconOnly = false,
    startIcon,
    endIcon,
    disabled,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-variant={variant}
      data-size={size}
      className={cn(
        styles.base,
        styles[variant],
        size !== 'md' && styles[size],
        fullWidth && styles.fullWidth,
        iconOnly && styles.iconOnly,
        loading && styles.loading,
        className,
      )}
    >
      {loading && (
        <span className={styles.spinner}>
          {/* Decorativo de propósito: quem carrega o estado é o aria-busy.
              Um <span> "Carregando" aqui roubaria o nome acessível do botão. */}
          <Spinner size={size === 'lg' ? 'md' : 'sm'} label={children ? null : loadingLabel} />
        </span>
      )}
      <span className={styles.label}>
        {startIcon && (
          <span className={styles.icon} aria-hidden="true">
            {startIcon}
          </span>
        )}
        {children}
        {endIcon && (
          <span className={styles.icon} aria-hidden="true">
            {endIcon}
          </span>
        )}
      </span>
    </button>
  );
});
