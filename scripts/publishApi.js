/* eslint-disable unicorn/no-process-exit, unicorn/prefer-module */
const { publishPackages } = require('./lib/publishApi');

const myArgs = process.argv.slice(2);
const labels = myArgs[0].split('|');

publishPackages(labels)
  .then(console.log)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
