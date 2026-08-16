import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from '../../hooks/useTheme';

function Controles() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={toggleTheme}>Alternar</button>
      <button onClick={() => setTheme('dark')}>Escuro</button>
      <button onClick={() => setTheme('system')}>Sistema</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('aplica data-theme no <html>', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <Controles />
      </ThemeProvider>,
    );

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('resolve "system" usando a preferência do SO', () => {
    render(
      <ThemeProvider defaultTheme="system">
        <Controles />
      </ThemeProvider>,
    );

    // O matchMedia do setup responde false, então o sistema está no claro.
    expect(screen.getByTestId('theme')).toHaveTextContent('system');
    expect(screen.getByTestId('resolved')).toHaveTextContent('light');
  });

  it('alterna entre claro e escuro', async () => {
    render(
      <ThemeProvider defaultTheme="light">
        <Controles />
      </ThemeProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Alternar' }));

    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('persiste a escolha em localStorage', async () => {
    render(
      <ThemeProvider defaultTheme="light">
        <Controles />
      </ThemeProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Escuro' }));
    expect(window.localStorage.getItem('mare-ui-theme')).toBe('dark');
  });

  it('lê a escolha salva no primeiro render', () => {
    window.localStorage.setItem('mare-ui-theme', 'dark');

    render(
      <ThemeProvider defaultTheme="light">
        <Controles />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('não persiste quando persist é falso', async () => {
    render(
      <ThemeProvider defaultTheme="light" persist={false}>
        <Controles />
      </ThemeProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Escuro' }));
    expect(window.localStorage.getItem('mare-ui-theme')).toBeNull();
  });

  it('sobrevive a um localStorage bloqueado', async () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('acesso negado');
    });

    render(
      <ThemeProvider defaultTheme="light">
        <Controles />
      </ThemeProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Escuro' }));

    // A troca acontece mesmo sem conseguir salvar.
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    spy.mockRestore();
  });

  it('avisa quando useTheme é usado fora do provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<Controles />)).toThrow(/ThemeProvider/);

    spy.mockRestore();
  });
});
