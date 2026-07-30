import { defineConfig } from '@rsbuild/core';
import { pluginEslint } from '@rsbuild/plugin-eslint';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);

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
    pluginTypeCheck({
      enable: dev,
      tsCheckerOptions: {
        typescript: {
          tsgo: true,
          typescriptPath: require.resolve('@typescript/native/package.json'),
        },
      },
    }),
    pluginEslint({ enable: dev, eslintPluginOptions: { configType: 'flat' } }),
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
