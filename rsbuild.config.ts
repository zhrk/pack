import lightDark from '@csstools/postcss-light-dark-function';
import { defineConfig } from '@rsbuild/core';
import { pluginEslint } from '@rsbuild/plugin-eslint';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import path from 'path';

const dev = process.env.NODE_ENV === 'development';

export default defineConfig({
  dev: { cliShortcuts: false },
  html: { template: './public/index.html' },
  server: { printUrls: false, strictPort: true, publicDir: { watch: true } },
  output: {
    distPath: { root: 'build' },
    cssModules: { localIdentName: '[local]_[hash:6]' },
    sourceMap: dev ? { js: 'source-map', css: true } : { js: 'hidden-source-map' },
  },
  plugins: [
    pluginSass({
      sassLoaderOptions: {
        sassOptions: {
          loadPaths: [path.resolve(process.cwd(), 'src/styles')],
        },
        additionalData: `@use "breakpoints" as *;`,
      },
    }),
    pluginReact(),
    pluginTypeCheck({ enable: dev }),
    pluginEslint({ enable: dev, eslintPluginOptions: { emitWarning: false, configType: 'flat' } }),
    pluginSvgr({ svgrOptions: { ref: true, icon: true, exportType: 'default' } }),
  ],
  tools: {
    lightningcssLoader: false,
    rspack: (config, { rspack }) => {
      config.plugins.push(
        new rspack.LightningCssMinimizerRspackPlugin({ minimizerOptions: { targets: [] } })
      );

      return config;
    },
    postcss: (_, { addPlugins }) => {
      addPlugins([
        lightDark(),
        require('postcss-functions')({
          functions: {
            'color-opacity': (color: string, opacity: string) => {
              return `color-mix(in srgb, ${color}, transparent ${100 - parseFloat(opacity) * 100}%)`;
            },
          },
        }),
      ]);
    },
  },
});
