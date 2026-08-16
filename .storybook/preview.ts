import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/styles/tokens.css';
import '../src/styles/utilities.css';
import '../src/styles/global.css';
import './storybook.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
      expanded: true,
    },
    backgrounds: { disable: true },
    a11y: {
      // Não deixa passar despercebido: violação de acessibilidade aparece como erro na aba A11y.
      config: { rules: [{ id: 'color-contrast', enabled: true }] },
    },
    options: {
      storySort: {
        order: [
          'Fundamentos',
          ['Introdução', 'Cores', 'Tipografia', 'Espaçamento'],
          'Componentes',
          'Padrões',
        ],
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { Claro: 'light', Escuro: 'dark' },
      defaultTheme: 'Claro',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
