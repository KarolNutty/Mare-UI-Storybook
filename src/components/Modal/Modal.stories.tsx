import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { Input } from '../Input';

const meta = {
  title: 'Componentes/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Diálogo modal com foco preso dentro, Esc para fechar, scroll do body travado e foco devolvido ao gatilho. No mobile ele vira uma folha ancorada no rodapé.',
      },
    },
  },
  args: { open: true, onClose: () => {} },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: 'Padrão',
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Convidar pessoa</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Convidar para a equipe"
          description="A pessoa recebe um e-mail com o link de acesso."
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setOpen(false)}>Enviar convite</Button>
            </>
          }
        >
          <Input label="E-mail" placeholder="pessoa@empresa.com.br" />
        </Modal>
      </>
    );
  },
};

export const Destrutivo: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Excluir projeto
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="sm"
          title="Excluir “Campanha Verão”?"
          description="Os 1.284 contatos do fluxo continuam na base, mas o histórico de conversas some."
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Manter projeto
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                Excluir mesmo assim
              </Button>
            </>
          }
        />
      </>
    );
  },
};

export const SemSaidaFacil: Story = {
  name: 'Sem saída fácil',
  parameters: {
    docs: {
      description: {
        story:
          'Quando a decisão é obrigatória: sem X, sem Esc, sem clique fora. Use com moderação — bloquear a saída irrita.',
      },
    },
  },
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Aceitar novos termos</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Atualizamos os termos de uso"
          hideCloseButton
          closeOnEscape={false}
          closeOnOverlayClick={false}
          footer={<Button onClick={() => setOpen(false)}>Li e aceito</Button>}
        >
          A partir de 1º de setembro, mensagens ficam armazenadas por 24 meses.
        </Modal>
      </>
    );
  },
};
