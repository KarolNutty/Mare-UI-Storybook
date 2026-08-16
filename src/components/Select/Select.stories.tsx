import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'Componentes/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Select nativo, de propósito: no celular o seletor do sistema é mais rápido e mais acessível que qualquer listbox customizada.',
      },
    },
  },
  args: {
    label: 'Canal de atendimento',
    options: [
      { label: 'WhatsApp', value: 'whatsapp' },
      { label: 'Instagram Direct', value: 'instagram' },
      { label: 'Chat do site', value: 'web' },
      { label: 'Telegram (em breve)', value: 'telegram', disabled: true },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };

export const ComPlaceholder: Story = {
  name: 'Com placeholder',
  args: { placeholder: 'Escolha um canal' },
};

export const ComErro: Story = {
  name: 'Com erro',
  args: { placeholder: 'Escolha um canal', error: 'Selecione um canal para continuar.' },
};

export const Tamanhos: Story = {
  render: (args) => (
    <div className="mare-stack">
      <Select {...args} size="sm" label="Pequeno" />
      <Select {...args} size="md" label="Médio" />
      <Select {...args} size="lg" label="Grande" />
    </div>
  ),
};
