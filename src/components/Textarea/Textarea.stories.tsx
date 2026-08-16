import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Componentes/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { label: 'Mensagem de boas-vindas', placeholder: 'Oi! Como podemos ajudar?' },
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };

export const ComDica: Story = {
  name: 'Com dica',
  args: { hint: 'Aparece assim que a pessoa manda a primeira mensagem.' },
};

export const SemRedimensionar: Story = {
  name: 'Sem redimensionar',
  args: { resizable: false, rows: 3 },
};

export const ComErro: Story = {
  name: 'Com erro',
  args: { error: 'A mensagem passa de 1.024 caracteres.' },
};
