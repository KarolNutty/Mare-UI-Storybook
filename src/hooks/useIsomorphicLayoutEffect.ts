import { useEffect, useLayoutEffect } from 'react';

/** useLayoutEffect avisa no SSR. No servidor cai para useEffect. */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
