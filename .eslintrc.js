const { resolve } = require('path');

module.exports = {
  env: {
    jest: true,
    node: true,
    browser: true,
    es6: true,
    commonjs: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: [
      resolve(__dirname, './tsconfig.base.json'),
      resolve(__dirname, './packages/api-client/tsconfig.json'),
      resolve(__dirname, './packages/composables/tsconfig.json'),
      resolve(__dirname, './packages/theme/tsconfig.json')
    ],
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue'],
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  extends: [
    '@vue-storefront/eslint-config-base',
    '@vue-storefront/eslint-config-typescript',
    '@vue-storefront/eslint-config-import',
    '@vue-storefront/eslint-config-vue',
    '@vue-storefront/eslint-config-jest',
  ],
}
