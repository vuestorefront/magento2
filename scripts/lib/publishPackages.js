const npmPublish = require('@jsdevtools/npm-publish');
const path = require('path');
const labelsToRemove = ['release'];
const npmLabelBase = 'NPM:';

const publishPackages = async (labels, token) => {
  const npmTagBase = [...labels]
  .filter((l) => !labelsToRemove.includes(l))
  .find((l) => l.startsWith(npmLabelBase));

  if(npmTagBase){
    const npmTag = npmTagBase.replace(new RegExp(`${npmLabelBase}`), '');

    const baseApiClientPath = path.join(process.cwd(), 'packages', 'api-client');

    const baseComposablesPath = path.join(process.cwd(), 'packages', 'composables');

    const basePublishOptions = {
      token: token,
      tag: npmTag,
      access: 'public',
      checkVersion: true,
    };

    const apiReturn = await npmPublish({
      package: path.resolve(baseApiClientPath, './package.json'),
      ...basePublishOptions,
    });

    const composerReturn = await npmPublish({
      package: path.resolve(baseComposablesPath, './package.json'),
      ...basePublishOptions,
    });

    console.log(apiReturn, composerReturn);

    return {
      apiReturn,
      composerReturn,
    }
  }
}

module.exports = {
  publishPackages,
}
