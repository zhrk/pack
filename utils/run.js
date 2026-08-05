const { spawnSync } = require('node:child_process');

const quoteArg = (arg) => (/\s/.test(arg) ? `"${arg}"` : arg);

const run = (command, args = []) => {
  const fullCommand = [command, ...args].map(quoteArg).join(' ');

  const result = spawnSync(fullCommand, { shell: true, stdio: 'inherit' });

  process.exitCode = result.status ?? 1;

  return result;
};

module.exports = run;
