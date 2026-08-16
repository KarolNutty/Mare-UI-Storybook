import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('associa o rótulo ao controle', () => {
    render(<Input label="E-mail" />);
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
  });

  it('liga a dica ao campo por aria-describedby', () => {
    render(<Input label="Senha" hint="Mínimo de 8 caracteres" />);

    const input = screen.getByLabelText('Senha');
    const hintId = input.getAttribute('aria-describedby');

    expect(hintId).toBeTruthy();
    expect(document.getElementById(hintId!)).toHaveTextContent('Mínimo de 8 caracteres');
  });

  it('marca o campo como inválido e descreve o erro quando há mensagem', () => {
    render(<Input label="CPF" error="CPF inválido" />);

    const input = screen.getByLabelText('CPF');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('CPF inválido');
  });

  it('esconde a dica quando existe erro, para não competir por atenção', () => {
    render(<Input label="CPF" hint="Somente números" error="CPF inválido" />);

    expect(screen.queryByText('Somente números')).not.toBeInTheDocument();
    expect(screen.getByText('CPF inválido')).toBeInTheDocument();
  });

  it('aceita digitação', async () => {
    render(<Input label="Cidade" />);

    const input = screen.getByLabelText('Cidade');
    await userEvent.type(input, 'Aracaju');

    expect(input).toHaveValue('Aracaju');
  });

  it('gera ids únicos entre instâncias', () => {
    render(
      <>
        <Input label="Primeiro" />
        <Input label="Segundo" />
      </>,
    );

    expect(screen.getByLabelText('Primeiro').id).not.toBe(screen.getByLabelText('Segundo').id);
  });
});
