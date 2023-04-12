const { resolve } = require('path');

module.exports = {
  env: {
    jest: true,
    node: true,
    browser: true,
    es6: true,
    commonjs: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: [
      resolve(__dirname, './tsconfig.json'),
      resolve(__dirname, './packages/api-client/tsconfig.eslint.json'),
      resolve(__dirname, './packages/load-tests/tsconfig.json')
    ],
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue'],
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  ignorePatterns: ['packages/api-types'],
  extends: [
    '@vue-storefront/eslint-config-base',
    '@vue-storefront/eslint-config-typescript',
    '@vue-storefront/eslint-config-import',
    '@vue-storefront/eslint-config-vue',
    '@vue-storefront/eslint-config-jest'
  ],
  globals: {
    '__ENV': 'readonly'
  },
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    'jest/expect-expect': [
      'error',
      {
        'assertFunctionNames': ['expect', 'getByRole', 'getByTestId', 'getByText']
      }
    ],
    'no-plusplus': 'off'
  },
  overrides: [
    {
      'files': ['internals/**/*'],
      'rules': {
        'unicorn/prefer-module': 'off'
      }
    }
  ]
};

