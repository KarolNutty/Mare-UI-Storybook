import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { Button } from '../Button';

const meta = {
  title: 'Componentes/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Aviso no fluxo da página. `danger` e `warning` usam `role="alert"` e interrompem o leitor de tela; `info` e `success` usam `role="status"` e esperam a vez.',
      },
    },
  },
  args: { title: 'Sincronização concluída', children: 'Importamos 248 contatos do CSV.' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 520 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão', args: { tone: 'info' } };

export const Tons: Story = {
  render: () => (
    <div className="mare-stack" style={{ width: '100%' }}>
      <Alert tone="info" title="Manutenção programada">
        O painel fica indisponível domingo, das 2h às 4h.
      </Alert>
      <Alert tone="success" title="Pagamento confirmado">
        A nota fiscal chega no seu e-mail em alguns minutos.
      </Alert>
      <Alert tone="warning" title="Cartão vence em 6 dias">
        Atualize a forma de pagamento para não perder o acesso.
      </Alert>
      <Alert tone="danger" title="Não foi possível importar a planilha">
        A coluna &ldquo;telefone&rdquo; não foi encontrada no arquivo.
      </Alert>
    </div>
  ),
};

export const ComAcoes: Story = {
  name: 'Com ações',
  args: {
    tone: 'danger',
    title: 'Falha ao enviar 3 mensagens',
    children: 'O número do WhatsApp não respondeu ao webhook.',
    actions: (
      <>
        <Button size="sm" variant="outline">
          Tentar de novo
        </Button>
        <Button size="sm" variant="ghost">
          Ver detalhes
        </Button>
      </>
    ),
  },
};

export const Dispensavel: Story = {
  name: 'Dispensável',
  args: { tone: 'info', onDismiss: () => {} },
};
