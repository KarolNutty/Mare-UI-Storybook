import { describe, expect, it } from 'vitest';
import type { ComponentProps } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

function renderTooltip(props: Partial<ComponentProps<typeof Tooltip>> = {}) {
  return render(
    <Tooltip content="Reenviar campanha" delay={0} {...props}>
      <button>Reenviar</button>
    </Tooltip>,
  );
}

describe('Tooltip', () => {
  it('começa escondido', () => {
    renderTooltip();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('aparece no hover', async () => {
    renderTooltip();

    await userEvent.hover(screen.getByRole('button'));
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Reenviar campanha');
  });

  it('some ao tirar o mouse', async () => {
    renderTooltip();

    const trigger = screen.getByRole('button');
    await userEvent.hover(trigger);
    await screen.findByRole('tooltip');

    await userEvent.unhover(trigger);
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('aparece no foco de teclado — não só no mouse', async () => {
    renderTooltip();

    await userEvent.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
  });

  it('descreve o gatilho enquanto visível', async () => {
    renderTooltip();

    await userEvent.hover(screen.getByRole('button'));
    await screen.findByRole('tooltip');

    expect(screen.getByRole('button')).toHaveAccessibleDescription('Reenviar campanha');
  });

  it('fecha no Esc', async () => {
    renderTooltip();

    await userEvent.hover(screen.getByRole('button'));
    await screen.findByRole('tooltip');

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('não aparece quando desabilitado', async () => {
    renderTooltip({ disabled: true });

    await userEvent.hover(screen.getByRole('button'));
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });
});
