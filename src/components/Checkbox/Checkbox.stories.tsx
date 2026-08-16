import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Componentes/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Marca uma escolha que só vale depois do "Salvar". Quando o efeito é imediato, o componente certo é o Switch.',
      },
    },
  },
  args: { label: 'Receber resumo semanal por e-mail' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: 'Padrão' };

export const ComDescricao: Story = {
  name: 'Com descrição',
  args: {
    label: 'Arquivar conversas resolvidas',
    description: 'Some da fila principal depois de 7 dias sem resposta.',
  },
};

export const Estados: Story = {
  render: () => (
    <div className="mare-stack">
      <Checkbox label="Desmarcado" />
      <Checkbox label="Marcado" defaultChecked />
      <Checkbox label="Parcial" indeterminate />
      <Checkbox label="Desabilitado" disabled />
      <Checkbox label="Marcado e desabilitado" defaultChecked disabled />
    </div>
  ),
};

export const ListaComPai: Story = {
  name: 'Lista com item pai',
  parameters: {
    docs: {
      description: {
        story:
          'O caso clássico do estado parcial: o pai fica indeterminado quando só parte dos filhos está marcada.',
      },
    },
  },
  render: function Render() {
    const canais = ['WhatsApp', 'Instagram', 'E-mail'];
    const [selecionados, setSelecionados] = useState<string[]>(['WhatsApp']);

    const todos = selecionados.length === canais.length;
    const algum = selecionados.length > 0 && !todos;

    return (
      <div className="mare-stack">
        <Checkbox
          label="Todos os canais"
          checked={todos}
          indeterminate={algum}
          onChange={(event) => setSelecionados(event.target.checked ? [...canais] : [])}
        />
        <div className="mare-stack" style={{ paddingInlineStart: 26, gap: 8 }}>
          {canais.map((canal) => (
            <Checkbox
              key={canal}
              label={canal}
              checked={selecionados.includes(canal)}
              onChange={(event) =>
                setSelecionados((atual) =>
                  event.target.checked ? [...atual, canal] : atual.filter((item) => item !== canal),
                )
              }
            />
          ))}
        </div>
      </div>
    );
  },
};
