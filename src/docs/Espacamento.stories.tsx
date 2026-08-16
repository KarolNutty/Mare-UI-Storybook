import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Fundamentos/Espaçamento e forma',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Escala em base 4. Nenhum componente usa pixel solto: se um valor não está aqui, ele não deveria estar no CSS.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const espacos = [
  ['0-5', '2px'],
  ['1', '4px'],
  ['1-5', '6px'],
  ['2', '8px'],
  ['3', '12px'],
  ['4', '16px'],
  ['5', '20px'],
  ['6', '24px'],
  ['8', '32px'],
  ['10', '40px'],
  ['12', '48px'],
  ['16', '64px'],
];

const raios = [
  ['xs', 'Caixa de seleção'],
  ['sm', 'Badge, botão de fechar'],
  ['md', 'Botão, campo, alerta'],
  ['lg', 'Card, modal'],
  ['xl', 'Blocos grandes'],
  ['full', 'Avatar, pílula, switch'],
];

export const Espaco: Story = {
  name: 'Espaço',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {espacos.map(([token, px]) => (
        <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <code
            style={{
              fontFamily: 'var(--mare-font-mono)',
              fontSize: 11,
              color: 'var(--mare-color-fg-subtle)',
              minWidth: 120,
            }}
          >
            space-{token}
          </code>
          <div
            style={{
              height: 16,
              width: `var(--mare-space-${token})`,
              backgroundColor: 'var(--mare-color-accent-bg)',
              borderRadius: 2,
            }}
          />
          <span style={{ fontSize: 12, color: 'var(--mare-color-fg-muted)' }}>{px}</span>
        </div>
      ))}
    </div>
  ),
};

export const Raios: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: 16,
      }}
    >
      {raios.map(([token, uso]) => (
        <div key={token} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              height: 72,
              backgroundColor: 'var(--mare-color-accent-bg-subtle)',
              border: '1px solid var(--mare-color-accent-border)',
              borderRadius: `var(--mare-radius-${token})`,
            }}
          />
          <code style={{ fontFamily: 'var(--mare-font-mono)', fontSize: 11 }}>radius-{token}</code>
          <span style={{ fontSize: 11, color: 'var(--mare-color-fg-muted)' }}>{uso}</span>
        </div>
      ))}
    </div>
  ),
};

export const Elevacao: Story = {
  name: 'Elevação',
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 24, flexWrap: 'wrap' }}>
      {['raised', 'overlay'].map((token) => (
        <div
          key={token}
          style={{
            width: 200,
            height: 110,
            display: 'grid',
            placeItems: 'center',
            backgroundColor: 'var(--mare-color-bg-surface)',
            borderRadius: 'var(--mare-radius-lg)',
            boxShadow: `var(--mare-shadow-${token})`,
            fontFamily: 'var(--mare-font-mono)',
            fontSize: 11,
            color: 'var(--mare-color-fg-muted)',
          }}
        >
          shadow-{token}
        </div>
      ))}
    </div>
  ),
};
