const { publishPackages } = require('./lib/publishPackages');

const myArgs = process.argv.slice(2);
const token = myArgs[1];
const labels = myArgs[0].split('|');

return publishPackages(labels, token)
  .then((result) => {
    console.log(result);
  }).catch((e) => {
    throw e;
  });
