import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta = {
  title: 'Componentes/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Aparece no hover **e** no foco de teclado — um tooltip só de mouse simplesmente não existe para quem navega por Tab. Esc fecha. Nunca coloque aqui informação essencial: em toque, tooltip não aparece.',
      },
    },
  },
  args: {
    content: 'Reenviar a última campanha para os não abertos',
    children: <Button variant="outline">Reenviar</Button>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: 'Padrão',
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outline">Reenviar</Button>
    </Tooltip>
  ),
};

export const Posicoes: Story = {
  name: 'Posições',
  render: () => (
    <div className="mare-row" style={{ padding: 64, gap: 24 }}>
      <Tooltip content="Acima" placement="top">
        <Button variant="ghost">Top</Button>
      </Tooltip>
      <Tooltip content="Abaixo" placement="bottom">
        <Button variant="ghost">Bottom</Button>
      </Tooltip>
      <Tooltip content="À esquerda" placement="left">
        <Button variant="ghost">Left</Button>
      </Tooltip>
      <Tooltip content="À direita" placement="right">
        <Button variant="ghost">Right</Button>
      </Tooltip>
    </div>
  ),
};

export const SemAtraso: Story = {
  name: 'Sem atraso',
  args: { delay: 0, content: 'Aparece na hora' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outline">Passe o mouse</Button>
    </Tooltip>
  ),
};
