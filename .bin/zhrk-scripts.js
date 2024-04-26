#!/usr/bin/env node

const path = require('node:path'); 
const { spawnSync } = require("child_process");

// chalk для ошибки несуществуюего скрипта
// обработать занятый порт
// команда для генерации index.html или его обновления?
// команда для генерации всей структуры

const script = process.argv[2];

const webpackConfigPath = path.join(__dirname, "../webpack.config.js");
const rsbuildConfigPath = path.join(__dirname, "../rsbuild.config.ts");
const vitestConfigPath = path.join(__dirname, "../vitest.config.ts");

const scripts = {
  start: { command: "webpack", args: ["serve", "--mode", "development", "--config", webpackConfigPath] },
  build: { command: "webpack", args: ["--mode", "production", "--config", webpackConfigPath] },
  ['start:rsbuild']: { command: "rsbuild", args: ["dev", "--config", rsbuildConfigPath] },
  ['build:rsbuild']: { command: "rsbuild", args: ["build", "--config", rsbuildConfigPath] },
  test: { command: "vitest", args: ["--config", vitestConfigPath] },
};

const { command, args } = scripts[script];

if (!scripts.hasOwnProperty(script)) {
  console.error(`Script ${script} does not exist `);

  process.exit(1);
}

const child = spawnSync(command, args, {
  shell: true,
  stdio: "inherit",
});

// child.on('exit', (code, signal) => {
//   if (code !== null) {
//     process.exit(code);
//   }

//   if (signal !== null) {
//     process.kill(process.pid, signal);
//   }
// });
