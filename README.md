# Maré UI

Design system em React + TypeScript. Tokens semânticos, tema claro/escuro, acessibilidade verificada por teste e documentação viva no Storybook.

O nome vem da costa: em Aracaju a maré manda no dia. A ideia aqui é parecida — os tokens mandam na interface, e o resto se ajusta.

```bash
npm install
npm run dev        # Storybook em localhost:6006
npm test           # 73 testes
npm run build      # gera dist/ com ESM, CJS e tipos
```

---

## O que tem dentro

**15 componentes** — Button, Input, Textarea, Select, Checkbox, Switch, Badge, Avatar, Card, Alert, Spinner, Modal, Tabs, Tooltip, Field, ThemeProvider.

**4 hooks reutilizáveis** — `useControllableState`, `useFocusTrap`, `useScrollLock`, `useTheme`.

**Zero dependências de runtime.** Só `react` e `react-dom` como peer. Nada de `clsx`, nada de biblioteca de ícones, nada de CSS-in-JS: o bundle final é CSS estático de 30 kB (5,7 kB gzip).

---

## As três decisões que sustentam o resto

### 1. Tokens em duas camadas

A camada de primitivos guarda valores brutos (`--mare-tide-500: #12727e`). A camada semântica dá papel a eles (`--mare-color-accent-bg: var(--mare-tide-500)`).

**Nenhum componente referencia um primitivo.** Todos consomem semânticos. É por isso que o tema escuro cabe em um bloco de CSS de 40 linhas em vez de uma reescrita:

```css
[data-theme='dark'] {
  /* No escuro a marca clareia: contraste sobre fundo funda, não sobre papel. */
  --mare-color-accent-bg: var(--mare-tide-300);
}
```

O `Button` não sabe que o tema mudou. Nem precisa.

### 2. Acessibilidade é teste, não intenção

Todo componente interativo tem teste de teclado, de nome acessível e de relação ARIA. O `addon-a11y` roda o axe em cada story.

Isso não é enfeite. Um dos testes existe porque encontrou um bug real: o spinner do botão em estado de loading tinha um `<span>` "Carregando" que **substituía** o nome acessível — o botão "Publicar" virava "Carregando" para quem usa leitor de tela. A correção foi trocar `visibility: hidden` por `opacity: 0` no rótulo, porque `visibility: hidden` remove o texto do cálculo do nome acessível e `opacity` não. Hoje o teste quebra se alguém repetir o erro.

Outros casos que a suíte cobre:

| Componente | O que é garantido                                                                         |
| ---------- | ----------------------------------------------------------------------------------------- |
| `Tabs`     | Setas navegam, Home/End vão aos extremos, abas desabilitadas são puladas, roving tabindex |
| `Modal`    | Foco preso dentro, foco devolvido ao gatilho ao fechar, scroll do body travado, Esc       |
| `Tooltip`  | Aparece no **foco de teclado**, não só no hover                                           |
| `Switch`   | Operável por teclado, `role="switch"`, descrição ligada por `aria-describedby`            |
| `Input`    | Rótulo, dica e erro conectados por id sem precisar passá-lo na mão                        |

### 3. Controlado e não-controlado, sempre os dois

O hook `useControllableState` deixa `Switch` e `Tabs` funcionarem dos dois jeitos com uma API só:

```tsx
<Switch label="Backup automático" defaultChecked />          {/* não-controlado */}
<Switch label="Backup automático" checked={on} onCheckedChange={setOn} />  {/* controlado */}
```

Quem só quer jogar na tela não escreve `useState`. Quem tem form state não briga com o componente.

---

## Uso

```tsx
import { ThemeProvider, Button, Input, Modal } from '@mare-ui/react';
import '@mare-ui/react/styles.css';

export function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Input label="E-mail" hint="Usamos só para o login." />
      <Button variant="solid">Entrar</Button>
    </ThemeProvider>
  );
}
```

O `ThemeProvider` respeita a preferência do sistema, persiste a escolha e sobrevive a um `localStorage` bloqueado (Safari privado, iframe com sandbox, extensão barrando) — nesse caso ele só deixa de persistir, sem quebrar.

### Só os tokens

Não precisa dos componentes React? A paleta sai sozinha:

```css
@import '@mare-ui/react/tokens.css';
```

Serve para landing em HTML puro, template de e-mail ou app em outro framework. A identidade continua a mesma.

---

## Arquitetura

```
src/
├── styles/
│   ├── tokens.css        primitivos + semânticos + tema escuro
│   ├── global.css        reset opcional
│   └── utilities.css     .mare-sr-only
├── components/
│   └── <Nome>/
│       ├── Nome.tsx
│       ├── Nome.module.css
│       ├── Nome.test.tsx
│       ├── Nome.stories.tsx
│       └── index.ts
├── hooks/
├── lib/cn.ts
└── docs/                 páginas de Fundamentos do Storybook
```

Cada componente é uma pasta fechada: código, estilo, teste e documentação no mesmo lugar. Achar tudo sobre o `Modal` é abrir uma pasta.

**CSS Modules** em vez de CSS-in-JS: sem custo de runtime, sem hidratação, e o CSS sai como arquivo estático que o navegador cacheia. As classes saem legíveis no DOM (`mare-base-a1b2`) porque debugar `_x7f2k` é sofrimento desnecessário.

---

## Scripts

| Comando                   | O que faz                             |
| ------------------------- | ------------------------------------- |
| `npm run dev`             | Storybook em modo watch               |
| `npm test`                | Vitest                                |
| `npm run test:coverage`   | Cobertura com v8                      |
| `npm run build`           | Biblioteca: ESM + CJS + `.d.ts` + CSS |
| `npm run build:storybook` | Site estático da documentação         |
| `npm run typecheck`       | `tsc --noEmit`                        |
| `npm run lint`            | ESLint, zero warnings tolerados       |

O CI roda typecheck, lint, testes, build da lib e build do Storybook em cada push.

---

## Decisões que valem explicar

**Select é nativo.** No celular, o seletor do sistema é mais rápido e mais acessível que qualquer listbox customizada. Uma listbox própria seria mais bonita nos meus prints e pior para quem usa.

**Switch é `<button role="switch">`, não `<input>`.** Switch aplica a mudança na hora; checkbox espera um "Salvar". A diferença é semântica, não visual. Quando o valor precisa ir junto no submit, `name` renderiza um input oculto.

**Tooltip nunca carrega informação essencial.** Em toque ele não aparece. O que está lá é reforço, não conteúdo.

**Só um gradiente no sistema inteiro.** A "linha de maré" marca a aba ativa e nada mais. Um sistema com gradiente em tudo não tem hierarquia — tem barulho.

---

## Licença

MIT
