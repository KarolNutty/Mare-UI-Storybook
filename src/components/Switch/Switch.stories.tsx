import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta = {
  title: 'Componentes/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Aplica a mudança na hora — por isso é um `button` com `role="switch"`, e não um input de formulário. Quando precisa ir junto no submit, passe `name` e um input oculto carrega o valor.',
      },
    },
  },
  args: { label: 'Respostas automáticas' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };

export const ComDescricao: Story = {
  name: 'Com descrição',
  args: {
    label: 'Backup automático',
    description: 'Roda todo dia às 3h da manhã, no fuso da conta.',
    defaultChecked: true,
  },
};

export const LinhaDeConfiguracao: Story = {
  name: 'Linha de configuração',
  parameters: {
    docs: {
      description: {
        story: 'Com `labelFirst`, o controle vai para a direita — o padrão de telas de ajustes.',
      },
    },
  },
  render: () => (
    <div className="mare-stack" style={{ width: 380 }}>
      <Switch
        labelFirst
        label="Notificar por e-mail"
        description="Só para conversas sem resposta há mais de 1h."
        defaultChecked
        className="mare-full"
      />
      <Switch labelFirst label="Notificar no navegador" className="mare-full" />
      <Switch labelFirst label="Resumo diário" description="Chega às 18h." className="mare-full" />
    </div>
  ),
};

export const Estados: Story = {
  render: () => (
    <div className="mare-stack">
      <Switch label="Desligado" />
      <Switch label="Ligado" defaultChecked />
      <Switch label="Desabilitado" disabled />
      <Switch label="Ligado e desabilitado" defaultChecked disabled />
    </div>
  ),
};
