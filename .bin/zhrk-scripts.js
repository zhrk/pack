#!/usr/bin/env node

const path = require('node:path'); 
const { spawnSync } = require("child_process");

// chalk для ошибки несуществуюего скрипта
// обработать занятый порт
// вынести тесты

const script = process.argv[2];

const webpackConfigPath = path.join(__dirname, "../webpack.config.js")

const scripts = {
  start: { command: "webpack", args: ["serve", "--mode", "development", "--config", webpackConfigPath] },
  build: { command: "webpack", args: ["--mode", "production", "--config", webpackConfigPath] },
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
