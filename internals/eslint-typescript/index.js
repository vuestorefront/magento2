module.exports = {
  extends: [
    './rules/plugins',
    './rules/extends',
    './rules/rules',
  ].map((element) => require.resolve(element)),
};
