const { exec } = require("child_process");
const path = require('path');
const labelsToRemove = ['release'];
const npmLabelBase = 'NPM:';

const publishPackages = (labels, token) => {
  return new Promise((resolve, reject) => {
    try {
      const npmTagBase = [...labels]
      .filter((l) => !labelsToRemove.includes(l))
      .find((l) => l.startsWith(npmLabelBase));

      if (npmTagBase) {
        const npmTag = npmTagBase.replace(new RegExp(`${npmLabelBase}`), '');

        const baseApiClientPath = path.join(process.cwd(), 'packages', 'api-client');

        const baseComposablesPath = path.join(process.cwd(), 'packages', 'composables');

        [baseApiClientPath, baseComposablesPath].forEach((p) => {
          exec(`npm publish ${p} --access public --tag ${npmTag}`, (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
          });
        });
      }
    } catch(e){
      reject(e);
    }
  });
}

module.exports = {
  publishPackages,
}
