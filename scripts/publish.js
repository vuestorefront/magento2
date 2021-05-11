const { publishPackages } = require('./lib/publishPackages');

(async () => {
  const myArgs = process.argv.slice(2);
  const token = myArgs[1];
  const labels = myArgs[0].split('|');

  if(token || labels.length <= 0) return false;

  try {
    await publishPackages(labels, token);
  } catch (e) {
    throw e;
  }
})();
