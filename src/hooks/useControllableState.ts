import { useCallback, useRef, useState } from 'react';

export interface UseControllableStateOptions<T> {
  /** Valor vindo de fora. Se definido, o componente é controlado. */
  value?: T;
  /** Valor inicial quando o componente é não-controlado. */
  defaultValue: T;
  /** Chamado em toda mudança, controlado ou não. */
  onChange?: (value: T) => void;
}

/**
 * Um componente de design system precisa funcionar dos dois jeitos: o time que
 * quer só jogar na tela usa não-controlado; o time com form state usa controlado.
 * Este hook resolve os dois com a mesma API interna.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T, (next: T) => void] {
  const [uncontrolled, setUncontrolled] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? (value as T) : uncontrolled;

  // Evita recriar o setter a cada render por causa do onChange.
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next);
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  return [current, setValue];
}
