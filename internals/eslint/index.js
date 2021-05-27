module.exports = {
  extends: [
    './rules/env',
    './rules/parser',
    './rules/globals',
    './rules/plugins',
    './rules/extends',
    './rules/rules',
  ].map(require.resolve),
};
