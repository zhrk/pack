/* eslint-disable consistent-return */
/// <reference types="vitest" />
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.join(__dirname, 'setupTests.ts')],
  },
  plugins: [
    {
      name: 'load-svg',
      enforce: 'pre',
      transform: (_, id) => {
        if (id.endsWith('.svg')) {
          return 'export default () => {}';
        }
      },
    },
  ],
});
