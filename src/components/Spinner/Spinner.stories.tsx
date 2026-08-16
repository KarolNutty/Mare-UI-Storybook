import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Componentes/Spinner',
  component: Spinner,
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };

export const Tamanhos: Story = {
  render: () => (
    <div className="mare-row">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Decorativo: Story = {
  args: { label: null },
  parameters: {
    docs: {
      description: {
        story:
          'Com `label={null}` o spinner some para leitores de tela. Use assim dentro de botões, onde quem carrega o estado é o `aria-busy`.',
      },
    },
  },
};
