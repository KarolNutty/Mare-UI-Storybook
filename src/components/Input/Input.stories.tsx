import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Componentes/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Campo de texto com rótulo, dica e erro já conectados por `aria-describedby` — sem precisar passar id na mão.',
      },
    },
  },
  args: { label: 'E-mail', placeholder: 'voce@empresa.com.br' },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };

export const ComDica: Story = {
  name: 'Com dica',
  args: { label: 'Senha', type: 'password', hint: 'Mínimo de 8 caracteres, com um número.' },
};

export const ComErro: Story = {
  name: 'Com erro',
  args: {
    label: 'CNPJ',
    defaultValue: '00.000.000/0000-00',
    error: 'CNPJ não encontrado na Receita.',
  },
};

export const Opcional: Story = {
  args: { label: 'Telefone', showOptional: true, placeholder: '(79) 90000-0000' },
};

export const Obrigatorio: Story = {
  name: 'Obrigatório',
  args: { label: 'Nome completo', required: true },
};

export const ComAdornos: Story = {
  name: 'Com adornos',
  args: {
    label: 'Valor do plano',
    startAdornment: <span style={{ fontSize: 13 }}>R$</span>,
    defaultValue: '149,00',
  },
};

export const Tamanhos: Story = {
  render: (args) => (
    <div className="mare-stack">
      <Input {...args} size="sm" label="Pequeno" />
      <Input {...args} size="md" label="Médio" />
      <Input {...args} size="lg" label="Grande" />
    </div>
  ),
};

export const Desabilitado: Story = {
  args: { disabled: true, defaultValue: 'conta@empresa.com.br' },
};
