import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeContext, type Theme } from '../../hooks/useTheme';

const STORAGE_KEY = 'mare-ui-theme';

export interface ThemeProviderProps {
  children: ReactNode;
  /** Tema inicial quando não há nada salvo. Padrão: "system". */
  defaultTheme?: Theme;
  /** Elemento que recebe o atributo data-theme. Padrão: <html>. */
  target?: 'html' | 'body';
  /** Persiste a escolha em localStorage. Padrão: true. */
  persist?: boolean;
  /** Chave do localStorage, caso o app já use outra. */
  storageKey?: string;
}

function readStoredTheme(key: string): Theme | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(key);
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : null;
  } catch {
    // Safari em modo privado, iframe sandbox, extensão bloqueando: seguir sem persistir.
    return null;
  }
}

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Aplica o tema no DOM e expõe o controle via useTheme().
 * Fica no topo da árvore — os componentes nunca leem o tema direto.
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  target = 'html',
  persist = true,
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (persist ? readStoredTheme(storageKey) : null) ?? defaultTheme,
  );
  const [systemIsDark, setSystemIsDark] = useState<boolean>(systemPrefersDark);

  // Acompanha a preferência do SO enquanto o tema for "system".
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => setSystemIsDark(event.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  const resolvedTheme: 'light' | 'dark' =
    theme === 'system' ? (systemIsDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const element = target === 'body' ? document.body : document.documentElement;
    element.setAttribute('data-theme', resolvedTheme);
    return () => element.removeAttribute('data-theme');
  }, [resolvedTheme, target]);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      if (!persist) return;
      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        // Persistência é conveniência, não requisito.
      }
    },
    [persist, storageKey],
  );

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
