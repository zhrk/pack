import path from 'path';
import { defineConfig } from 'vitest/config';

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
