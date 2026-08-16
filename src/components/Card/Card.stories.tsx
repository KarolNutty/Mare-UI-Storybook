import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardBody, CardFooter, CardHeader } from './Card';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Avatar, AvatarGroup } from '../Avatar';

const meta = {
  title: 'Componentes/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: 'Padrão',
  render: (args) => (
    <Card {...args}>
      <CardHeader
        title="Plano Crescimento"
        subtitle="Renova em 12 de setembro"
        action={<Badge tone="success">Ativo</Badge>}
      />
      <CardBody>
        Até 10 mil contatos, 3 números de WhatsApp conectados e relatórios com histórico de 12
        meses.
      </CardBody>
      <CardFooter align="end">
        <Button variant="ghost" size="sm">
          Comparar planos
        </Button>
        <Button size="sm">Fazer upgrade</Button>
      </CardFooter>
    </Card>
  ),
};

export const Variantes: Story = {
  render: () => (
    <div className="mare-stack" style={{ width: '100%' }}>
      <Card variant="outlined">
        <CardBody>Contornado — o padrão, para listas densas.</CardBody>
      </Card>
      <Card variant="raised">
        <CardBody>Elevado — quando o cartão precisa se destacar do fundo.</CardBody>
      </Card>
      <Card variant="flat">
        <CardBody>Chapado — bom para blocos de apoio dentro de uma página já cheia.</CardBody>
      </Card>
    </div>
  ),
};

export const ComPessoas: Story = {
  name: 'Com pessoas',
  render: () => (
    <Card variant="raised">
      <CardHeader
        title="Squad Atendimento"
        subtitle="4 pessoas · Aracaju e remoto"
        action={
          <AvatarGroup>
            <Avatar size="sm" name="Ana Souza" />
            <Avatar size="sm" name="Bruno Lima" />
            <Avatar size="sm" name="Carla Dias" />
            <Avatar size="sm" name="+2" />
          </AvatarGroup>
        }
      />
      <CardBody>Responsável pela fila de WhatsApp e pelos fluxos de pós-venda.</CardBody>
    </Card>
  ),
};
