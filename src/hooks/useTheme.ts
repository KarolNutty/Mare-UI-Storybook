import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  /** Tema escolhido pelo usuário. */
  theme: Theme;
  /** Tema efetivamente aplicado (resolve "system" para light ou dark). */
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  /** Alterna entre claro e escuro a partir do tema resolvido. */
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme precisa estar dentro de um <ThemeProvider>.');
  }

  return context;
}
