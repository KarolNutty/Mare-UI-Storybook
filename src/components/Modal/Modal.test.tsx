import { describe, expect, it, vi } from 'vitest';
import { useState, type ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';
import { Button } from '../Button';

function renderModal(props: Partial<ComponentProps<typeof Modal>> = {}) {
  const onClose = vi.fn();
  render(
    <Modal open onClose={onClose} title="Excluir projeto" {...props}>
      <p>Essa ação não pode ser desfeita.</p>
      <Button>Confirmar</Button>
    </Modal>,
  );
  return { onClose };
}

describe('Modal', () => {
  it('não renderiza nada quando fechado', () => {
    render(
      <Modal open={false} onClose={vi.fn()} title="Oculto">
        conteúdo
      </Modal>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renderiza como diálogo modal com nome acessível', () => {
    renderModal();

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleName('Excluir projeto');
  });

  it('descreve o diálogo quando há descrição', () => {
    renderModal({ description: 'Confirme para continuar' });
    expect(screen.getByRole('dialog')).toHaveAccessibleDescription('Confirme para continuar');
  });

  it('fecha no Esc', async () => {
    const { onClose } = renderModal();

    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('ignora o Esc quando closeOnEscape é falso', async () => {
    const { onClose } = renderModal({ closeOnEscape: false });

    await userEvent.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('fecha pelo botão de fechar', async () => {
    const { onClose } = renderModal();

    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('esconde o botão de fechar quando a decisão é obrigatória', () => {
    renderModal({ hideCloseButton: true });
    expect(screen.queryByRole('button', { name: 'Fechar' })).not.toBeInTheDocument();
  });

  it('move o foco para dentro do diálogo ao abrir', () => {
    renderModal();
    expect(screen.getByRole('dialog')).toContainElement(document.activeElement as HTMLElement);
  });

  it('trava o scroll do body enquanto aberto', () => {
    const { unmount } = render(
      <Modal open onClose={vi.fn()} title="Aberto">
        conteúdo
      </Modal>,
    );

    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('prende o Tab dentro do diálogo', async () => {
    renderModal();

    const dialog = screen.getByRole('dialog');
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();

    expect(dialog).toContainElement(document.activeElement as HTMLElement);
  });

  it('devolve o foco para o gatilho ao fechar', async () => {
    function Host() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Abrir</Button>
          <Modal open={open} onClose={() => setOpen(false)} title="Diálogo">
            conteúdo
          </Modal>
        </>
      );
    }

    render(<Host />);
    const trigger = screen.getByRole('button', { name: 'Abrir' });

    await userEvent.click(trigger);
    await userEvent.keyboard('{Escape}');

    expect(trigger).toHaveFocus();
  });

  it('renderiza o rodapé de ações', () => {
    renderModal({ footer: <Button variant="danger">Excluir</Button> });
    expect(screen.getByRole('button', { name: 'Excluir' })).toBeInTheDocument();
  });
});
