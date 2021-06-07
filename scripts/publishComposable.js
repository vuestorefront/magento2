/* eslint-disable unicorn/prefer-module */
const { publishPackages } = require('./lib/publishComposable');

const myArgs = process.argv.slice(2);
const labels = myArgs[0].split('|');

publishPackages(labels)
  .then(console.log)
  .catch((e) => {
    console.error(e);
  });
