#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('node:path');
const runScript = require('./utils/runScript.js');

// обработать падение билда
// команда для генерации всей структуры?
// команда для генерации index.html или его обновления?

const webpackConfigPath = path.join(__dirname, './webpack.config.js');
const rsbuildConfigPath = path.join(__dirname, './rsbuild.config.ts');
const vitestConfigPath = path.join(__dirname, './vitest.config.ts');

const script = process.argv[2];

const scripts = {
  start: {
    command: 'webpack',
    args: ['serve', '--mode', 'development', '--config', webpackConfigPath],
  },
  build: { command: 'webpack', args: ['--mode', 'production', '--config', webpackConfigPath] },
  'start:rsbuild': { command: 'rsbuild', args: ['dev', '--config', rsbuildConfigPath] },
  'build:rsbuild': { command: 'rsbuild', args: ['build', '--config', rsbuildConfigPath] },
  test: { command: 'vitest', args: ['--config', vitestConfigPath] },
};

const { command, args } = scripts[script];

runScript(command, args);
