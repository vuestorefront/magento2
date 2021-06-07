/* eslint-disable unicorn/no-process-exit, unicorn/prefer-module */
const labelsToRemove = ['release'];
const npmLabelBase = 'NPM:';

const getTag = (labels) => {
  const npmTagBase = [...labels]
  .filter((l) => !labelsToRemove.includes(l))
  .find((l) => l.startsWith(npmLabelBase));

  if (!npmTagBase) {
    throw new Error('Without tag base');
  }

  return npmTagBase.replace(new RegExp(`${npmLabelBase}`), '');;
};

module.exports = {
  getTag,
}
