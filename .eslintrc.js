module.exports = {
  extends: '@vue-storefront/eslint-config-integrations',
  rules: {
    // Remove those later so that you are fully compliant with the company config
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-param-reassign': 'off',
    'consistent-return': 'off',
  },
};
