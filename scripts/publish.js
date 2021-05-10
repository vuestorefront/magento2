const { publishPackages } = require('./lib/publishPackages');

(async () => {
  const myArgs = process.argv.slice(2);

  try {
    await publishPackages(JSON.parse(myArgs[0]), myArgs[1]);
  } catch (e) {
    console.error(e);
  }
})();
