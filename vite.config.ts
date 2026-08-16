/// <reference types="vitest/config" />
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', 'src/test'],
      rollupTypes: false,
    }),
  ],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  css: {
    modules: {
      // Classes legiveis no DOM ajudam debug e testes de snapshot.
      generateScopedName: 'mare-[local]-[hash:base64:4]',
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MareUI',
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      // Sem isto o Vite nomeia o CSS a partir do nome do pacote ("react.css").
      cssFileName: 'mare-ui',
      formats: ['es', 'cjs'],
    },
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/components/**/*.tsx', 'src/hooks/**/*.ts', 'src/lib/**/*.ts'],
      exclude: ['**/*.stories.tsx', '**/index.ts'],
    },
  },
});
