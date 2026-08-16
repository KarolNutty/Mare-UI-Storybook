import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Fundamentos/Cores',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A paleta vive em duas camadas. Primitivos são valores brutos e nunca aparecem em componente. Componentes só consomem tokens semânticos — é isso que faz o tema escuro funcionar sem tocar em uma linha de componente.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const escalas: Array<{ nome: string; prefixo: string; sobre: string; passos: string[] }> = [
  {
    nome: 'Maré',
    prefixo: 'tide',
    sobre: 'A cor de marca. Petróleo de água funda.',
    passos: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    nome: 'Sol',
    prefixo: 'sun',
    sobre: 'Acento quente. Aparece pouco: destaque e aviso.',
    passos: ['50', '100', '200', '300', '400', '500', '600', '700', '800'],
  },
  {
    nome: 'Coral',
    prefixo: 'coral',
    sobre: 'Erro e ações destrutivas.',
    passos: ['50', '100', '200', '300', '400', '500', '600', '700'],
  },
  {
    nome: 'Mangue',
    prefixo: 'mangue',
    sobre: 'Sucesso e confirmação.',
    passos: ['50', '100', '200', '300', '400', '500', '600', '700'],
  },
  {
    nome: 'Calha',
    prefixo: 'calha',
    sobre: 'Informação neutra.',
    passos: ['50', '100', '200', '300', '400', '500', '600', '700'],
  },
  {
    nome: 'Neutros',
    prefixo: 'neutral',
    sobre: 'Puxados para o petróleo — não são cinzas puros.',
    passos: ['0', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  },
];

const semanticos: Array<{ grupo: string; tokens: string[] }> = [
  {
    grupo: 'Superfícies',
    tokens: ['bg-canvas', 'bg-surface', 'bg-raised', 'bg-subtle', 'bg-muted', 'bg-inverse'],
  },
  {
    grupo: 'Texto',
    tokens: ['fg-default', 'fg-muted', 'fg-subtle', 'fg-disabled', 'fg-inverse', 'fg-on-accent'],
  },
  { grupo: 'Bordas', tokens: ['border-subtle', 'border-default', 'border-strong'] },
  {
    grupo: 'Marca',
    tokens: ['accent-bg', 'accent-bg-hover', 'accent-bg-active', 'accent-bg-subtle', 'accent-fg'],
  },
  {
    grupo: 'Estados',
    tokens: ['danger-bg', 'success-bg', 'warning-bg', 'info-bg'],
  },
];

function Amostra({ variavel, rotulo }: { variavel: string; rotulo: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div
        style={{
          height: 56,
          borderRadius: 'var(--mare-radius-md)',
          backgroundColor: `var(${variavel})`,
          border: '1px solid var(--mare-color-border-subtle)',
        }}
      />
      <code
        style={{
          fontFamily: 'var(--mare-font-mono)',
          fontSize: 11,
          color: 'var(--mare-color-fg-muted)',
          wordBreak: 'break-all',
        }}
      >
        {rotulo}
      </code>
    </div>
  );
}

function Titulo({ children, sobre }: { children: string; sobre?: string }) {
  return (
    <header style={{ marginBottom: 12 }}>
      <h3
        style={{
          fontFamily: 'var(--mare-font-display)',
          fontSize: 'var(--mare-font-size-lg)',
          color: 'var(--mare-color-fg-default)',
          margin: 0,
        }}
      >
        {children}
      </h3>
      {sobre && (
        <p
          style={{
            fontSize: 'var(--mare-font-size-sm)',
            color: 'var(--mare-color-fg-muted)',
            margin: '4px 0 0',
          }}
        >
          {sobre}
        </p>
      )}
    </header>
  );
}

export const Primitivos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {escalas.map((escala) => (
        <section key={escala.prefixo}>
          <Titulo sobre={escala.sobre}>{escala.nome}</Titulo>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
              gap: 12,
            }}
          >
            {escala.passos.map((passo) => (
              <Amostra
                key={passo}
                variavel={`--mare-${escala.prefixo}-${passo}`}
                rotulo={`${escala.prefixo}-${passo}`}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

export const Semanticos: Story = {
  name: 'Semânticos',
  parameters: {
    docs: {
      description: {
        story:
          'Troque o tema no seletor da barra de cima: os quadrados mudam, os nomes não. É esse contrato que os componentes consomem.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {semanticos.map((secao) => (
        <section key={secao.grupo}>
          <Titulo>{secao.grupo}</Titulo>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: 12,
            }}
          >
            {secao.tokens.map((token) => (
              <Amostra key={token} variavel={`--mare-color-${token}`} rotulo={`color-${token}`} />
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};
