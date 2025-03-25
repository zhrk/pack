import { defineConfig } from '@rsbuild/core';
import { pluginEslint } from '@rsbuild/plugin-eslint';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

const enable = process.env.NODE_ENV === 'development';

export default defineConfig({
  dev: { cliShortcuts: false },
  html: { template: './public/index.html' },
  server: { open: true, printUrls: false, strictPort: true, publicDir: { watch: true } },
  output: { distPath: { root: 'build' }, cssModules: { localIdentName: '[local]_[hash:6]' } },
  plugins: [
    pluginSass(),
    pluginReact(),
    pluginTypeCheck({ enable }),
    pluginEslint({ enable, eslintPluginOptions: { emitWarning: false, configType: 'flat' } }),
    pluginSvgr({ svgrOptions: { ref: true, icon: true, exportType: 'default' } }),
  ],
  tools: {
    postcss: (_, { addPlugins }) => {
      addPlugins(
        require('postcss-functions')({
          functions: {
            'color-opacity': (color: string, opacity: string) =>
              `color-mix(in srgb, ${color}, transparent ${(1 - parseFloat(opacity)) * 100}%)`,
          },
        })
      );
    },
  },
});
