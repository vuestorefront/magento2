// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  extends: [
    './rules/plugins',
    './rules/extends',
    './rules/rules',
  // eslint-disable-next-line unicorn/prefer-module, unicorn/no-array-callback-reference
  ].map(require.resolve),
};
