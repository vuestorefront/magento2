module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    './rules/plugins',
    './rules/extends',
    './rules/rules',
    './rules/settings',
  // eslint-disable-next-line unicorn/no-array-callback-reference
  ].map(require.resolve),
};
