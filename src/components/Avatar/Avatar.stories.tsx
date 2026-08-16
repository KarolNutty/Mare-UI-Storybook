import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Avatar';

const meta = {
  title: 'Componentes/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Se a imagem falhar, cai para as iniciais sozinho — nada de quadrado quebrado na tela.',
      },
    },
  },
  args: { name: 'Ana Beatriz Souza' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };

export const Tamanhos: Story = {
  render: (args) => (
    <div className="mare-row">
      <Avatar {...args} size="xs" />
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
    </div>
  ),
};

export const Quadrado: Story = { args: { square: true, size: 'lg' } };

export const ImagemQuebrada: Story = {
  name: 'Imagem quebrada',
  args: { src: 'https://exemplo.invalido/foto.jpg', size: 'lg' },
};

export const Grupo: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar name="Ana Souza" />
      <Avatar name="Bruno Lima" />
      <Avatar name="Carla Dias" />
      <Avatar name="Diego Reis" />
      <Avatar fallback="+3" />
    </AvatarGroup>
  ),
};
