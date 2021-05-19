module.exports = {
  extends: [
    './rules/plugins',
    './rules/extends',
  ].map(require.resolve),
};
