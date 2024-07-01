#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { Command } = require('commander');
const detectPort = require('detect-port');
const killPort = require('kill-port');
const { PORT } = require('./config.ts');

// chalk сообщение при занятом порте
// обработать занятый порт
// обработать падение билда
// команда для генерации всей структуры?
// команда для генерации index.html или его обновления?
// использовать node:utils parseArgs для CLI аргументов?

const cwd = process.cwd();
const program = new Command();

const webpackConfigPath = path.join(__dirname, './webpack.config.js');
const rsbuildConfigPath = path.join(__dirname, './rsbuild.config.ts');
const vitestConfigPath = path.join(__dirname, './vitest.config.ts');

const runScript = async (command, args) => {
  const detectedPort = await detectPort(PORT);

  if (detectedPort === PORT) {
    const options = program.opts();

    const run = () => spawnSync(command, args, { shell: true, stdio: 'inherit' });

    if (options.runCondition) {
      const [condition, value] = options.runCondition;

      if (condition === 'no-folder-exists') {
        if (!fs.existsSync(path.join(cwd, value))) run();
      }
    } else {
      run();
    }
  } else {
    await killPort(PORT);

    runScript(command, args);
  }
};

program.option('-rc, --run-condition <value...>');

program
  .command('start')
  .action(() =>
    runScript('webpack', ['serve', '--mode', 'development', '--config', webpackConfigPath])
  );

program
  .command('build')
  .action(() => runScript('webpack', ['--mode', 'production', '--config', webpackConfigPath]));

program
  .command('start:rsbuild')
  .action(() => runScript('rsbuild', ['dev', '--config', rsbuildConfigPath]));

program
  .command('build:rsbuild')
  .action(() => runScript('rsbuild', ['build', '--config', rsbuildConfigPath]));

program.command('test').action(() => runScript('vitest', ['--config', vitestConfigPath]));

program.parse(process.argv);
