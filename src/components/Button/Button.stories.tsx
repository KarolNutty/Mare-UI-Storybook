import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Componentes/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A ação principal da interface. Uma tela deve ter no máximo um botão `solid` — se tudo é primário, nada é.',
      },
    },
  },
  args: { children: 'Salvar alterações' },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['solid', 'outline', 'ghost', 'subtle', 'danger'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };

export const Variantes: Story = {
  render: (args) => (
    <div className="mare-row">
      <Button {...args} variant="solid">
        Publicar
      </Button>
      <Button {...args} variant="outline">
        Visualizar
      </Button>
      <Button {...args} variant="ghost">
        Cancelar
      </Button>
      <Button {...args} variant="subtle">
        Duplicar
      </Button>
      <Button {...args} variant="danger">
        Excluir
      </Button>
    </div>
  ),
};

export const Tamanhos: Story = {
  render: (args) => (
    <div className="mare-row">
      <Button {...args} size="sm">
        Pequeno
      </Button>
      <Button {...args} size="md">
        Médio
      </Button>
      <Button {...args} size="lg">
        Grande
      </Button>
    </div>
  ),
};

export const Carregando: Story = {
  args: { loading: true, children: 'Publicando' },
  parameters: {
    docs: {
      description: {
        story:
          'O rótulo continua ocupando espaço (e continua sendo o nome acessível) para o botão não encolher no meio do clique.',
      },
    },
  },
};

export const ComIcones: Story = {
  name: 'Com ícones',
  render: (args) => (
    <div className="mare-row">
      <Button {...args} startIcon={<PlusIcon />}>
        Novo projeto
      </Button>
      <Button {...args} variant="outline" endIcon={<ArrowIcon />}>
        Continuar
      </Button>
      <Button {...args} variant="ghost" iconOnly aria-label="Mais opções">
        <DotsIcon />
      </Button>
    </div>
  ),
};

export const Desabilitado: Story = { args: { disabled: true } };

export const LarguraTotal: Story = {
  name: 'Largura total',
  args: { fullWidth: true },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Button {...args} />
    </div>
  ),
};

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 7h8m-3.2-3.2L11 7l-3.2 3.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
      <circle cx="3" cy="7" r="1.2" />
      <circle cx="7" cy="7" r="1.2" />
      <circle cx="11" cy="7" r="1.2" />
    </svg>
  );
}
