import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Fundamentos/Tipografia',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Três famílias, três papéis. Archivo carrega a personalidade e aparece só em título. Inter faz o trabalho pesado do corpo e da interface. JetBrains Mono é para dado, código e qualquer coisa que precise alinhar em coluna.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const escala = [
  { token: '4xl', uso: 'Título de página, uma vez por tela', fonte: 'display' },
  { token: '3xl', uso: 'Título de seção', fonte: 'display' },
  { token: '2xl', uso: 'Título de bloco', fonte: 'display' },
  { token: 'xl', uso: 'Título de card e de modal', fonte: 'display' },
  { token: 'lg', uso: 'Destaque dentro do corpo', fonte: 'body' },
  { token: 'md', uso: 'Corpo padrão (15px)', fonte: 'body' },
  { token: 'sm', uso: 'Interface: rótulos, botões, campos', fonte: 'body' },
  { token: 'xs', uso: 'Apoio: dicas, legendas, badges', fonte: 'body' },
  { token: '2xs', uso: 'Só para tabela densa e metadado', fonte: 'body' },
];

export const Escala: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {escala.map((item) => (
        <div
          key={item.token}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 24,
            paddingBottom: 16,
            borderBottom: '1px solid var(--mare-color-border-subtle)',
          }}
        >
          <code
            style={{
              fontFamily: 'var(--mare-font-mono)',
              fontSize: 11,
              color: 'var(--mare-color-fg-subtle)',
              minWidth: 130,
            }}
          >
            font-size-{item.token}
          </code>
          <span
            style={{
              fontFamily: `var(--mare-font-${item.fonte})`,
              fontSize: `var(--mare-font-size-${item.token})`,
              fontWeight: item.fonte === 'display' ? 600 : 400,
              letterSpacing: item.fonte === 'display' ? 'var(--mare-tracking-tight)' : undefined,
              color: 'var(--mare-color-fg-default)',
              flex: 1,
            }}
          >
            A maré sobe às seis
          </span>
          <span
            style={{
              fontSize: 'var(--mare-font-size-xs)',
              color: 'var(--mare-color-fg-muted)',
              minWidth: 220,
              textAlign: 'end',
            }}
          >
            {item.uso}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Familias: Story = {
  name: 'Famílias',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {[
        { nome: 'Archivo', token: 'display', papel: 'Títulos', peso: 600 },
        { nome: 'Inter', token: 'body', papel: 'Corpo e interface', peso: 400 },
        { nome: 'JetBrains Mono', token: 'mono', papel: 'Código e dados', peso: 400 },
      ].map((familia) => (
        <section key={familia.token}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 12,
              marginBottom: 8,
            }}
          >
            <strong
              style={{
                fontFamily: 'var(--mare-font-display)',
                fontSize: 'var(--mare-font-size-lg)',
                color: 'var(--mare-color-fg-default)',
              }}
            >
              {familia.nome}
            </strong>
            <span style={{ fontSize: 12, color: 'var(--mare-color-fg-muted)' }}>
              {familia.papel} · font-{familia.token}
            </span>
          </div>
          <p
            style={{
              fontFamily: `var(--mare-font-${familia.token})`,
              fontSize: familia.token === 'display' ? 28 : 17,
              fontWeight: familia.peso,
              letterSpacing: familia.token === 'display' ? '-0.02em' : undefined,
              color: 'var(--mare-color-fg-default)',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Sergipe tem 163 km de litoral. ABCDEFGHIJ 0123456789
          </p>
        </section>
      ))}
    </div>
  ),
};

export const Pesos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[
        ['regular', 400],
        ['medium', 500],
        ['semibold', 600],
        ['bold', 700],
      ].map(([nome, peso]) => (
        <div key={nome} style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
          <code
            style={{
              fontFamily: 'var(--mare-font-mono)',
              fontSize: 11,
              color: 'var(--mare-color-fg-subtle)',
              minWidth: 180,
            }}
          >
            font-weight-{nome}
          </code>
          <span
            style={{
              fontFamily: 'var(--mare-font-body)',
              fontSize: 18,
              fontWeight: peso as number,
              color: 'var(--mare-color-fg-default)',
            }}
          >
            A maré sobe às seis
          </span>
        </div>
      ))}
    </div>
  ),
};
