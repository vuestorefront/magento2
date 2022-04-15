module.exports = {
  extends: [
    './rules/plugins',
    './rules/extends',
    './rules/rules',
  ].map(require.resolve),
};
