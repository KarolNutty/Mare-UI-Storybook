import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Switch } from './Switch';

describe('Switch', () => {
  it('expõe role="switch" com o rótulo', () => {
    render(<Switch label="Notificações por e-mail" />);
    expect(screen.getByRole('switch', { name: 'Notificações por e-mail' })).toBeInTheDocument();
  });

  it('alterna sozinho quando não-controlado', async () => {
    render(<Switch label="Modo escuro" />);

    const control = screen.getByRole('switch');
    expect(control).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(control);
    expect(control).toHaveAttribute('aria-checked', 'true');
  });

  it('respeita o valor externo quando controlado', async () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Modo escuro" checked={false} onCheckedChange={onCheckedChange} />);

    const control = screen.getByRole('switch');
    await userEvent.click(control);

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    // Continua desligado: quem manda é a prop, não o clique.
    expect(control).toHaveAttribute('aria-checked', 'false');
  });

  it('acompanha o estado quando o pai controla de verdade', async () => {
    function Controlled() {
      const [on, setOn] = useState(false);
      return <Switch label="Wi-Fi" checked={on} onCheckedChange={setOn} />;
    }

    render(<Controlled />);
    const control = screen.getByRole('switch');

    await userEvent.click(control);
    expect(control).toHaveAttribute('aria-checked', 'true');
  });

  it('é operável pelo teclado', async () => {
    render(<Switch label="Som" />);

    await userEvent.tab();
    expect(screen.getByRole('switch')).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('não alterna quando desabilitado', async () => {
    render(<Switch label="Beta" disabled />);

    await userEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('envia o valor em formulários quando recebe name', () => {
    const { container } = render(<Switch label="Newsletter" name="newsletter" defaultChecked />);
    const hidden = container.querySelector('input[type="hidden"]');

    expect(hidden).toHaveAttribute('name', 'newsletter');
    expect(hidden).toHaveValue('on');
  });

  it('descreve o switch com o texto de apoio', () => {
    render(<Switch label="Backup" description="Roda todo dia às 3h" />);
    expect(screen.getByRole('switch')).toHaveAccessibleDescription('Roda todo dia às 3h');
  });
});
