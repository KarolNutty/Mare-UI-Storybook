# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).
Versionamento semântico.

## [0.3.0]

### Adicionado

- `Tabs` seguindo o padrão APG: navegação por setas, Home/End, roving tabindex e abas desabilitadas puladas.
- `Tooltip` com abertura por foco de teclado e fechamento no Esc.
- `Modal` com foco preso, devolução do foco ao gatilho e trava de scroll do body.
- Páginas de Fundamentos no Storybook (Cores, Tipografia, Espaçamento e forma).
- `tokens.css` e `global.css` publicados como arquivos isolados no `dist`.

### Corrigido

- **`Button`**: o spinner de loading substituía o nome acessível do botão. O rótulo usava
  `visibility: hidden`, que remove o texto do cálculo do nome acessível; trocado por
  `opacity: 0`, que preserva. Agora `<Button loading>Publicar</Button>` continua se chamando
  "Publicar" para leitores de tela, com o estado indo em `aria-busy`.
- `Checkbox`: as marcas de check e de indeterminado ocupavam células diferentes do grid e se
  desalinhavam. Ambas passaram a dividir a mesma célula.
- `ThemeProvider`: um `localStorage` bloqueado derrubava o provider inteiro. Agora a
  persistência falha em silêncio e o tema continua funcionando.

## [0.2.0]

### Adicionado

- `ThemeProvider` com suporte a `light`, `dark` e `system`, persistência e acompanhamento
  da preferência do SO em tempo real.
- Camada semântica de tokens e tema escuro completo.
- `useControllableState` — componentes passam a funcionar controlados e não-controlados
  com a mesma API.

### Alterado

- Componentes deixaram de referenciar tokens primitivos. Só consomem semânticos.

## [0.1.0]

### Adicionado

- Primeiros componentes: `Button`, `Input`, `Badge`, `Card`, `Spinner`.
- Escala de tokens primitivos (cor, tipografia, espaço, forma, movimento).
- Configuração de build em modo biblioteca com ESM, CJS e declarações de tipo.
