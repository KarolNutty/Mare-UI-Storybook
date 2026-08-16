import {
  useCallback,
  useId,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import { useControllableState } from '../../hooks/useControllableState';
import styles from './Tabs.module.css';

export interface TabItem {
  /** Identificador estável — vira parte dos ids de aria. */
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
  /** Ícone ou contador à esquerda do rótulo. */
  icon?: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: 'underline' | 'pills';
  /** Rótulo do conjunto de abas para leitores de tela. */
  'aria-label'?: string;
  className?: string;
}

/**
 * Abas seguindo o padrão APG: setas navegam, Home/End vão aos extremos,
 * e só a aba ativa entra na ordem de Tab (roving tabindex).
 */
export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  variant = 'underline',
  className,
  ...rest
}: TabsProps) {
  const baseId = useId();
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());

  const firstEnabled = items.find((item) => !item.disabled)?.value ?? items[0]?.value ?? '';
  const [active, setActive] = useControllableState({
    value,
    defaultValue: defaultValue ?? firstEnabled,
    onChange: onValueChange,
  });

  const focusTab = useCallback((tabValue: string) => {
    tabRefs.current.get(tabValue)?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
      const enabled = items.filter((item) => !item.disabled);
      if (enabled.length === 0) return;

      const currentEnabledIndex = enabled.findIndex((item) => item.value === items[index]?.value);
      let next: TabItem | undefined;

      switch (event.key) {
        case 'ArrowRight':
          next = enabled[(currentEnabledIndex + 1) % enabled.length];
          break;
        case 'ArrowLeft':
          next = enabled[(currentEnabledIndex - 1 + enabled.length) % enabled.length];
          break;
        case 'Home':
          next = enabled[0];
          break;
        case 'End':
          next = enabled[enabled.length - 1];
          break;
        default:
          return;
      }

      if (!next) return;
      event.preventDefault();
      setActive(next.value);
      focusTab(next.value);
    },
    [items, setActive, focusTab],
  );

  return (
    <div className={cn(styles.root, className)}>
      <div
        role="tablist"
        aria-label={rest['aria-label']}
        className={cn(styles.list, variant === 'pills' && styles.pillsList)}
      >
        {items.map((item, index) => {
          const selected = item.value === active;
          return (
            <button
              key={item.value}
              ref={(node) => {
                if (node) tabRefs.current.set(item.value, node);
                else tabRefs.current.delete(item.value);
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.value}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.value}`}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              className={cn(styles.tab, styles[variant === 'pills' ? 'pill' : 'underline'])}
              onClick={() => setActive(item.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => (
        <div
          key={item.value}
          role="tabpanel"
          id={`${baseId}-panel-${item.value}`}
          aria-labelledby={`${baseId}-tab-${item.value}`}
          tabIndex={0}
          hidden={item.value !== active}
          className={styles.panel}
        >
          {item.value === active && item.content}
        </div>
      ))}
    </div>
  );
}
