const { resolve } = require('path');
const airBnb = require('./eslint/airBnB/extends');
const eslintExtends = require('./eslint/extends');
const eslintRules = require('./eslint/airBnB/rules');
const jest = require('./eslint/jest/extends');
const jestRules = require('./eslint/jest/rules');
const typescript = require('./eslint/typescript/plugin');
const typescriptExtends = require('./eslint/typescript/extends');
const typescriptRules = require('./eslint/typescript/rules');
const vue = require('./eslint/vue/plugin');
const vueExtends = require('./eslint/vue/extends');

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
  plugins: [
    ...typescript,
    ...vue,
  ],
  extends: [
    ...eslintExtends,
    ...airBnb,
    ...typescriptExtends,
    ...vueExtends,
    ...jest,
  ],
  rules: {
    ...eslintRules,
    ...typescriptRules,
    ...jestRules,
  },
  settings: {},
}
