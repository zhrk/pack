#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

const { spawnSync } = require('node:child_process');
const path = require('node:path');
const detectPort = require('detect-port');
const killPort = require('kill-port');
const { PORT } = require('./config.ts');

// chalk сообщение при занятом порте
// обработать падение билда
// команда для генерации всей структуры?
// команда для генерации index.html или его обновления?

const webpackConfigPath = path.join(__dirname, './webpack.config.js');
const rsbuildConfigPath = path.join(__dirname, './rsbuild.config.ts');
const vitestConfigPath = path.join(__dirname, './vitest.config.ts');

const runScript = async (command, args) => {
  const detectedPort = await detectPort(PORT);

  if (detectedPort === PORT) {
    spawnSync(command, args, { shell: true, stdio: 'inherit' });
  } else {
    await killPort(PORT);

    runScript(command, args);
  }
};

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
