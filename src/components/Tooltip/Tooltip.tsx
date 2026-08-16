import {
  cloneElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  /** Texto curto. Tooltip não é lugar para informação essencial. */
  content: ReactNode;
  /** Único filho — precisa aceitar ref e eventos (um elemento nativo ou forwardRef). */
  children: ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Atraso antes de aparecer, em ms. Evita piscar ao passar o mouse de raspão. */
  delay?: number;
  disabled?: boolean;
  className?: string;
}

/**
 * Aparece no hover e também no foco de teclado — um tooltip só de mouse
 * simplesmente não existe para quem navega por Tab. Esc fecha.
 */
export function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 150,
  disabled = false,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const id = useId();

  const show = useCallback(() => {
    if (disabled) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay, disabled]);

  const hide = useCallback(() => {
    clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') hide();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, hide]);

  const trigger = cloneElement(children, {
    'aria-describedby': visible ? id : undefined,
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
  } as Partial<HTMLAttributes<HTMLElement>>);

  return (
    <span className={styles.wrapper}>
      {trigger}
      {visible && !disabled && (
        <span role="tooltip" id={id} className={cn(styles.bubble, styles[placement], className)}>
          {content}
        </span>
      )}
    </span>
  );
}
