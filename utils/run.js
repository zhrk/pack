/* eslint-disable @typescript-eslint/no-var-requires */

const { spawnSync } = require('node:child_process');

const run = (command, args) => spawnSync(command, args, { shell: true, stdio: 'inherit' });

module.exports = run;
