#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

const detectPort = require('detect-port');
const killPort = require('kill-port');
const { bgMagenta, whiteBright } = require('yoctocolors-cjs');
const { PORT } = require('../config.ts');
const run = require('./run.js');

const runScript = async (...args) => {
  const detectedPort = await detectPort(PORT);

  if (detectedPort === PORT) {
    run(...args);
  } else {
    // eslint-disable-next-line no-console
    console.log(bgMagenta(whiteBright(`Port ${PORT} was in use and has been terminated`)));

    await killPort(PORT);

    runScript(...args);
  }
};

module.exports = runScript;
