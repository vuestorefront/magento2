const { exec } = require("child_process");
const path = require('path');
const labelsToRemove = ['release'];
const npmLabelBase = 'NPM:';

const publishPackages = (labels) => {
  const npmTagBase = [...labels]
    .filter((l) => !labelsToRemove.includes(l))
    .find((l) => l.startsWith(npmLabelBase));

  if (!npmTagBase) {
    throw new Error('Without tag base');
  }

  const npmTag = npmTagBase.replace(new RegExp(`${npmLabelBase}`), '');

  const baseApiClientPath = path.join(process.cwd(), 'packages', 'api-client');

  const baseComposablesPath = path.join(process.cwd(), 'packages', 'composables');

  return Promise.all([baseApiClientPath, baseComposablesPath].map((p) => {
    return new Promise((res, rej) => {
      exec(`npm publish ${p} --access public --tag ${npmTag}`, (code, stdout, stderr) => {
        if (code !== 0) {
          console.error(`error: ${error.message}`);
          return rej(error);
        }

        console.log(`stdout: ${stdout}`);
        res();
      });
    });
  }));
}

module.exports = {
  publishPackages,
}
