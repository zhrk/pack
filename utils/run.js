const { spawnSync } = require('node:child_process');

const run = (command, args) => {
  const result = spawnSync(command, args, { shell: true, stdio: 'inherit' });

  process.exitCode = result.status ?? 1;

  return result;
};

module.exports = run;
