#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

// chalk для ошибки несуществуюего скрипта
// обработать занятый порт
// команда для генерации index.html или его обновления?
// команда для генерации всей структуры

const clearArgs = (args) => Array.from(args).filter((item) => item !== '');

const cwd = process.cwd();

const script = process.argv[2];

const scriptArgs = clearArgs(process.argv.slice(3).join(' ').split('--'));

const webpackConfigPath = path.join(__dirname, '../webpack.config.js');
const rsbuildConfigPath = path.join(__dirname, '../rsbuild.config.ts');
const vitestConfigPath = path.join(__dirname, '../vitest.config.ts');

const scripts = {
  start: {
    command: 'webpack',
    args: ['serve', '--mode', 'development', '--config', webpackConfigPath],
  },
  build: {
    command: 'webpack',
    args: ['--mode', 'production', '--config', webpackConfigPath],
  },
  ['start:rsbuild']: {
    command: 'rsbuild',
    args: ['dev', '--config', rsbuildConfigPath],
  },
  ['build:rsbuild']: {
    command: 'rsbuild',
    args: ['build', '--config', rsbuildConfigPath],
  },
  test: {
    command: 'vitest',
    args: ['--config', vitestConfigPath],
  },
};

const { command, args } = scripts[script];

if (!scripts.hasOwnProperty(script)) {
  console.error(`Script ${script} does not exist `);

  process.exit(1);
}

const shouldExec = () => {
  const noExec = scriptArgs.find((item) => item.includes('no-exec-cond'));

  if (!noExec) return true;

  const config = clearArgs(noExec.split(' '));

  if (config.length < 3) throw new Error('two arguments required');

  if (config[1] === 'folder-exists') {
    if (fs.existsSync(path.join(cwd, config[2]))) return false;
  }

  return true;
};

if (shouldExec()) {
  const child = spawnSync(command, args, {
    shell: true,
    stdio: 'inherit',
  });

  // child.on('exit', (code, signal) => {
  //   if (code !== null) {
  //     process.exit(code);
  //   }

  //   if (signal !== null) {
  //     process.kill(process.pid, signal);
  //   }
  // });
}
