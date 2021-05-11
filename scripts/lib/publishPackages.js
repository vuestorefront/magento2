const npmPublish = require('@jsdevtools/npm-publish');
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

        const basePublishOptions = {
          token: token,
          tag: npmTag,
          access: 'public',
          checkVersion: true,
        };
        npmPublish({
          package: path.resolve(baseApiClientPath, './package.json'),
          ...basePublishOptions,
        }).then((apiReturn) => {
          npmPublish({
            package: path.resolve(baseComposablesPath, './package.json'),
            ...basePublishOptions,
          }).then((composerReturn) => {
            resolve({
              apiReturn,
              composerReturn,
            })
          });
        })
      }
    } catch(e){
      reject(e);
    }
  });
}

module.exports = {
  publishPackages,
}
