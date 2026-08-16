import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { Badge } from '../Badge';

const meta = {
  title: 'Componentes/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Segue o padrão APG: setas navegam entre as abas, Home/End vão aos extremos, abas desabilitadas são puladas e só a ativa entra na ordem de Tab.',
      },
    },
  },
  args: {
    'aria-label': 'Configurações da conta',
    items: [
      { value: 'geral', label: 'Geral', content: <p>Nome da empresa, fuso horário e idioma.</p> },
      {
        value: 'cobranca',
        label: 'Cobrança',
        content: <p>Cartão terminado em 4242. Próxima cobrança em 12/09.</p>,
      },
      {
        value: 'integracoes',
        label: 'Integrações',
        content: <p>WhatsApp Cloud API conectado. Google Drive pendente.</p>,
      },
      {
        value: 'legado',
        label: 'Legado',
        content: <p>Configurações antigas.</p>,
        disabled: true,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sublinhado: Story = { args: { variant: 'underline' } };

export const Pilulas: Story = { name: 'Pílulas', args: { variant: 'pills' } };

export const ComContadores: Story = {
  name: 'Com contadores',
  args: {
    items: [
      {
        value: 'abertas',
        label: 'Abertas',
        icon: (
          <Badge tone="accent" pill>
            12
          </Badge>
        ),
        content: <p>12 conversas esperando resposta.</p>,
      },
      {
        value: 'pendentes',
        label: 'Pendentes',
        icon: (
          <Badge tone="warning" pill>
            3
          </Badge>
        ),
        content: <p>3 conversas aguardando o cliente.</p>,
      },
      {
        value: 'fechadas',
        label: 'Fechadas',
        content: <p>Histórico dos últimos 30 dias.</p>,
      },
    ],
  },
};
