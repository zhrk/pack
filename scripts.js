#!/usr/bin/env node

const path = require('node:path');
const run = require('./utils/run.js');

// обработать падение билда
// команда для генерации всей структуры?
// команда для генерации index.html или его обновления?

const rsbuildConfigPath = path.join(__dirname, './rsbuild.config.ts');
const vitestConfigPath = path.join(__dirname, './vitest.config.ts');

const [, , script, ...rest] = process.argv;

const scripts = {
  start: { command: 'rsbuild', args: ['dev', '--config', rsbuildConfigPath, ...rest] },
  build: { command: 'rsbuild', args: ['build', '--config', rsbuildConfigPath, ...rest] },
  test: { command: 'vitest', args: ['--config', vitestConfigPath, ...rest] },
};

const { command, args } = scripts[script];

run(command, args);
