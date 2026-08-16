import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar, getInitials } from './Avatar';

describe('getInitials', () => {
  it('usa primeira e última palavra', () => {
    expect(getInitials('Ana Beatriz Souza')).toBe('AS');
  });

  it('ignora conectivos', () => {
    expect(getInitials('Ana da Silva')).toBe('AS');
  });

  it('usa duas letras quando há um nome só', () => {
    expect(getInitials('Ana')).toBe('AN');
  });

  it('não quebra com string vazia', () => {
    expect(getInitials('   ')).toBe('');
  });
});

describe('Avatar', () => {
  it('mostra as iniciais quando não há imagem', () => {
    render(<Avatar name="Ana Souza" />);
    expect(screen.getByText('AS')).toBeInTheDocument();
  });

  it('usa o nome como texto alternativo da imagem', () => {
    render(<Avatar name="Ana Souza" src="https://exemplo.com/ana.jpg" />);
    expect(screen.getByRole('img', { name: 'Ana Souza' })).toBeInTheDocument();
  });
});
