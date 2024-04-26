/// <reference types="vitest" />
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.join(__dirname, 'setupTests.ts')],
  },
});
