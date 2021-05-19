module.exports = {
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/export': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off', // Allow single Named-export
    'import/extensions': 'off',
  },
};
