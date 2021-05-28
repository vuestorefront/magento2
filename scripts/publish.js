/* eslint-disable unicorn/no-process-exit */
const { publishPackages } = require('./lib/publishPackages');

const myArgs = process.argv.slice(2);
const labels = myArgs[0].split('|');

console.log(publishPackages);

publishPackages(labels)
  .then(console.log)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
