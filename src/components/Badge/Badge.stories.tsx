import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Componentes/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Ativo' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };

export const Tons: Story = {
  render: () => (
    <div className="mare-row">
      <Badge tone="neutral">Rascunho</Badge>
      <Badge tone="accent">Novo</Badge>
      <Badge tone="success">Pago</Badge>
      <Badge tone="warning">Vence hoje</Badge>
      <Badge tone="danger">Vencido</Badge>
      <Badge tone="info">Em análise</Badge>
    </div>
  ),
};

export const ComPonto: Story = {
  name: 'Com ponto de status',
  render: () => (
    <div className="mare-row">
      <Badge tone="success" dot pill>
        Operacional
      </Badge>
      <Badge tone="warning" dot pill>
        Degradado
      </Badge>
      <Badge tone="danger" dot pill>
        Fora do ar
      </Badge>
    </div>
  ),
};

export const Pilula: Story = {
  name: 'Pílula',
  args: { pill: true, tone: 'accent', children: '12' },
};
