import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('associa o rótulo ao input sem precisar de id manual', async () => {
    render(<Checkbox label="Aceito os termos" />);

    const checkbox = screen.getByRole('checkbox', { name: 'Aceito os termos' });
    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('reflete o estado indeterminado na propriedade do DOM', () => {
    render(<Checkbox label="Todos" indeterminate />);
    expect(screen.getByRole('checkbox')).toHaveProperty('indeterminate', true);
  });

  it('sai do estado indeterminado quando a prop muda', () => {
    const { rerender } = render(<Checkbox label="Todos" indeterminate />);
    rerender(<Checkbox label="Todos" indeterminate={false} />);

    expect(screen.getByRole('checkbox')).toHaveProperty('indeterminate', false);
  });

  it('não muda quando desabilitado', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Bloqueado" disabled onChange={onChange} />);

    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
