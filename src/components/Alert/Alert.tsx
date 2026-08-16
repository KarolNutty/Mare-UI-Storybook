import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import styles from './Alert.module.css';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone;
  title?: ReactNode;
  /** Ações no rodapé do alerta: "Tentar de novo", "Ver detalhes". */
  actions?: ReactNode;
  /** Habilita o botão de fechar. */
  onDismiss?: () => void;
  dismissLabel?: string;
  /** Substitui o ícone padrão do tom. Passe null para remover. */
  icon?: ReactNode | null;
}

const icons: Record<AlertTone, ReactNode> = {
  info: (
    <path d="M8 7.2v4M8 5.1v.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  ),
  success: (
    <path
      d="m5.2 8.3 2 2 3.6-4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  warning: (
    <path d="M8 4.8v4.1M8 11v.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  ),
  danger: (
    <path
      d="m5.6 5.6 4.8 4.8m0-4.8-4.8 4.8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  ),
};

/**
 * Mensagem no fluxo da página. Erro e aviso usam role="alert" para interromper
 * o leitor de tela; informação e sucesso usam "status", que espera a vez.
 */
export function Alert({
  tone = 'info',
  title,
  actions,
  onDismiss,
  dismissLabel = 'Fechar aviso',
  icon,
  className,
  children,
  ...rest
}: AlertProps) {
  const isUrgent = tone === 'danger' || tone === 'warning';

  return (
    <div
      {...rest}
      role={isUrgent ? 'alert' : 'status'}
      data-tone={tone}
      className={cn(styles.alert, styles[tone], className)}
    >
      {icon !== null &&
        (icon ?? (
          <svg
            className={styles.icon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
            {icons[tone]}
          </svg>
        ))}

      <div className={styles.content}>
        {title && <strong className={styles.title}>{title}</strong>}
        {children && <div className={styles.description}>{children}</div>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>

      {onDismiss && (
        <button
          type="button"
          className={styles.dismiss}
          onClick={onDismiss}
          aria-label={dismissLabel}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="m3 3 6 6M9 3l-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
