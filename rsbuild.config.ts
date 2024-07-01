import { defineConfig } from '@rsbuild/core';
import { pluginEslint } from '@rsbuild/plugin-eslint';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

// отображение ошибок eslint, typescript

export default defineConfig({
  plugins: [
    pluginSass(),
    pluginReact(),
    pluginEslint({ eslintPluginOptions: { emitWarning: false } }),
    pluginTypeCheck({ forkTsCheckerOptions: { typescript: { memoryLimit: 8192 } } }),
    pluginSvgr({ svgrOptions: { ref: true, exportType: 'default' } }),
  ],
  dev: { startUrl: true },
  html: { template: './public/index.html' },
  output: {
    distPath: { root: 'build' },
    cssModules: { localIdentName: '[local]_[hash:5]' },
  },
});
