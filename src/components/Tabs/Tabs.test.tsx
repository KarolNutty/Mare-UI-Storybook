import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, type TabItem } from './Tabs';

const items: TabItem[] = [
  { value: 'geral', label: 'Geral', content: <p>Conteúdo geral</p> },
  { value: 'cobranca', label: 'Cobrança', content: <p>Conteúdo de cobrança</p> },
  { value: 'legado', label: 'Legado', content: <p>Conteúdo legado</p>, disabled: true },
  { value: 'time', label: 'Time', content: <p>Conteúdo do time</p> },
];

describe('Tabs', () => {
  it('ativa a primeira aba habilitada por padrão', () => {
    render(<Tabs items={items} aria-label="Configurações" />);

    expect(screen.getByRole('tab', { name: 'Geral' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Conteúdo geral')).toBeInTheDocument();
  });

  it('troca de painel ao clicar', async () => {
    render(<Tabs items={items} aria-label="Configurações" />);

    await userEvent.click(screen.getByRole('tab', { name: 'Cobrança' }));

    expect(screen.getByText('Conteúdo de cobrança')).toBeInTheDocument();
    expect(screen.queryByText('Conteúdo geral')).not.toBeInTheDocument();
  });

  it('mantém só a aba ativa na ordem de tabulação (roving tabindex)', () => {
    render(<Tabs items={items} aria-label="Configurações" />);

    expect(screen.getByRole('tab', { name: 'Geral' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'Cobrança' })).toHaveAttribute('tabindex', '-1');
  });

  it('navega com as setas', async () => {
    render(<Tabs items={items} aria-label="Configurações" />);

    screen.getByRole('tab', { name: 'Geral' }).focus();
    await userEvent.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Cobrança' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Cobrança' })).toHaveAttribute('aria-selected', 'true');
  });

  it('pula abas desabilitadas na navegação por setas', async () => {
    render(<Tabs items={items} aria-label="Configurações" />);

    screen.getByRole('tab', { name: 'Cobrança' }).focus();
    await userEvent.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Time' })).toHaveFocus();
  });

  it('dá a volta ao chegar no fim da lista', async () => {
    render(<Tabs items={items} aria-label="Configurações" />);

    screen.getByRole('tab', { name: 'Geral' }).focus();
    await userEvent.keyboard('{ArrowLeft}');

    expect(screen.getByRole('tab', { name: 'Time' })).toHaveFocus();
  });

  it('Home e End vão para os extremos habilitados', async () => {
    render(<Tabs items={items} aria-label="Configurações" />);

    screen.getByRole('tab', { name: 'Geral' }).focus();
    await userEvent.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Time' })).toHaveFocus();

    await userEvent.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Geral' })).toHaveFocus();
  });

  it('liga cada painel à sua aba por aria-controls', () => {
    render(<Tabs items={items} aria-label="Configurações" />);

    const tab = screen.getByRole('tab', { name: 'Geral' });
    const panelId = tab.getAttribute('aria-controls');

    expect(document.getElementById(panelId!)).toHaveAttribute('aria-labelledby', tab.id);
  });

  it('avisa o pai quando controlado', async () => {
    const onValueChange = vi.fn();
    render(
      <Tabs items={items} value="geral" onValueChange={onValueChange} aria-label="Configurações" />,
    );

    await userEvent.click(screen.getByRole('tab', { name: 'Time' }));
    expect(onValueChange).toHaveBeenCalledWith('time');
  });
});
