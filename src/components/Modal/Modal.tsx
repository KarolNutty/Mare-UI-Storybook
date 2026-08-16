import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useScrollLock } from '../../hooks/useScrollLock';
import styles from './Modal.module.css';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children?: ReactNode;
  /** Linha de ações no rodapé. */
  footer?: ReactNode;
  /** Esconde o X do cabeçalho — use quando a decisão é obrigatória. */
  hideCloseButton?: boolean;
  closeLabel?: string;
  /** Clicar fora fecha. Padrão: true. */
  closeOnOverlayClick?: boolean;
  /** Esc fecha. Padrão: true. */
  closeOnEscape?: boolean;
  className?: string;
  /** Onde montar o portal. Padrão: document.body. */
  container?: HTMLElement | null;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footer,
  hideCloseButton = false,
  closeLabel = 'Fechar',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  container,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;

  useFocusTrap(dialogRef, open);
  useScrollLock(open);

  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, closeOnEscape, onClose]);

  // Só fecha se o gesto começou e terminou no overlay: arrastar texto de
  // dentro do diálogo para fora não deveria fechá-lo.
  const pressStartedOnOverlay = useRef(false);

  const handlePointerDown = useCallback((event: ReactPointerEvent) => {
    pressStartedOnOverlay.current = event.target === overlayRef.current;
  }, []);

  const handleClick = useCallback(
    (event: ReactMouseEvent) => {
      if (!closeOnOverlayClick) return;
      if (event.target === overlayRef.current && pressStartedOnOverlay.current) onClose();
      pressStartedOnOverlay.current = false;
    },
    [closeOnOverlayClick, onClose],
  );

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.overlay}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn(styles.dialog, size !== 'md' && styles[size], className)}
      >
        {(title || !hideCloseButton) && (
          <div className={styles.header}>
            <div className={styles.headerText}>
              {title && (
                <h2 className={styles.title} id={titleId}>
                  {title}
                </h2>
              )}
              {description && (
                <p className={styles.description} id={descriptionId}>
                  {description}
                </p>
              )}
            </div>
            {!hideCloseButton && (
              <button
                type="button"
                className={styles.close}
                onClick={onClose}
                aria-label={closeLabel}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="m3.5 3.5 7 7m0-7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {children && <div className={styles.body}>{children}</div>}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    container ?? document.body,
  );
}
