module.exports = {
  'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  'import/no-unresolved': 'off',
  'import/named': 'off',
  'import/export': 'off',
  'import/no-cycle': 'off',
  'import/prefer-default-export': 'off', // Allow single Named-export
  'import/no-extraneous-dependencies': 'off',
  'import/extensions': ['error', 'always', {
    js: 'never',
    mjs: 'never',
    jsx: 'never',
    ts: 'never',
    tsx: 'never',
  }],
};
