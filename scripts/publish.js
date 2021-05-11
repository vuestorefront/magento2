const { publishPackages } = require('./lib/publishPackages');

const myArgs = process.argv.slice(2);
const token = process.env.NPM_TOKEN || myArgs[1];
const labels = myArgs[0].split('|');

if (token || labels.length <= 0) return false;

return publishPackages(labels, token)
  .then((result) => {
    console.log(result);
  }).catch((e) => {
    throw e;
  });
