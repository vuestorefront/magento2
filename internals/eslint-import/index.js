module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    './rules/plugins',
    './rules/extends',
    './rules/rules',
    './rules/settings',
  ].map((element) => require.resolve(element)),
};
