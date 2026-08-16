import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renderiza o rótulo e dispara onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Salvar alterações</Button>);

    await userEvent.click(screen.getByRole('button', { name: 'Salvar alterações' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('usa type="button" por padrão para não submeter formulários sem querer', () => {
    render(<Button>Cancelar</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('bloqueia o clique enquanto carrega e sinaliza aria-busy', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Publicar
      </Button>,
    );

    const button = screen.getByRole('button', { name: /publicar/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');

    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('mantém o rótulo como nome acessível durante o loading', () => {
    render(<Button loading>Publicar</Button>);
    // O spinner é decorativo: o estado vai no aria-busy, não no nome do botão.
    expect(screen.getByRole('button')).toHaveAccessibleName('Publicar');
  });

  it('anuncia o carregamento em botões sem rótulo visível', () => {
    render(<Button loading iconOnly aria-label="Atualizar" loadingLabel="Atualizando" />);
    expect(screen.getByText('Atualizando')).toBeInTheDocument();
  });

  it('não dispara onClick quando desabilitado', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Excluir
      </Button>,
    );

    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('expõe variante e tamanho como data attributes para testes visuais', () => {
    render(
      <Button variant="danger" size="lg">
        Excluir conta
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', 'danger');
    expect(button).toHaveAttribute('data-size', 'lg');
  });

  it('encaminha a ref para o elemento nativo', () => {
    let node: HTMLButtonElement | null = null;
    render(<Button ref={(element) => (node = element)}>Focar</Button>);
    expect(node).toBeInstanceOf(HTMLButtonElement);
  });
});
