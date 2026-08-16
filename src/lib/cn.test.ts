import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('junta strings com espaço', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('descarta valores falsy', () => {
    expect(cn('a', false, null, undefined, '', 'b')).toBe('a b');
  });

  it('achata arrays aninhados', () => {
    expect(cn('a', ['b', ['c', false]], 'd')).toBe('a b c d');
  });

  it('mantém o zero, que é uma classe válida', () => {
    expect(cn(0, 'a')).toBe('0 a');
  });

  it('devolve string vazia sem entradas válidas', () => {
    expect(cn(false, null, undefined)).toBe('');
  });
});
