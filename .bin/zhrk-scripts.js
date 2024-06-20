#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { Command } = require('commander');
const { spawnSync } = require('node:child_process');

// chalk для ошибки несуществуюего скрипта
// обработать занятый порт
// команда для генерации index.html или его обновления?
// команда для генерации всей структуры
// обработать падение билда

const cwd = process.cwd();
const program = new Command();

const webpackConfigPath = path.join(__dirname, '../webpack.config.js');
const rsbuildConfigPath = path.join(__dirname, '../rsbuild.config.ts');
const vitestConfigPath = path.join(__dirname, '../vitest.config.ts');

const runScript = (command, args) => {
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
  .action(() => runScript('webpack', ['dev', '--config', rsbuildConfigPath]));

program
  .command('build:rsbuild')
  .action(() => runScript('webpack', ['build', '--config', rsbuildConfigPath]));

program.command('vitest').action(() => runScript('webpack', ['--config', vitestConfigPath]));

program.parse(process.argv);
