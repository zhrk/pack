#!/usr/bin/env node

const { spawn } = require("child_process");

const scriptName = process.argv[2];

const scripts = {
  start: "npm run start",
  build: "npm run build",
};

if (!scripts.hasOwnProperty(scriptName)) {
  console.error(`Invalid script: ${scriptName}`);
  process.exit(1);
}

const child = spawn(scripts[scriptName], {
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code, signal) => {
  if (code !== null) {
    process.exit(code);
  }
  if (signal !== null) {
    process.kill(process.pid, signal);
  }
});
