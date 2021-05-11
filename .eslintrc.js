const { resolve } = require('path');
const airBnb = require('./eslint/airBnB/extends');
const eslintExtends = require('./eslint/extends');
const eslintRules = require('./eslint/rules');
const jest = require('./eslint/jest/extends');
const jestRules = require('./eslint/jest/rules');
const importEsLint = require('./eslint/import/plugin');
const importEsLintExtends = require('./eslint/import/extends');
const importEsLintRules = require('./eslint/import/rules');
const importEsLintSettings = require('./eslint/import/settings');
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
    ...importEsLint,
  ],
  extends: [
    ...eslintExtends,
    ...airBnb,
    ...typescriptExtends,
    ...vueExtends,
    ...importEsLintExtends,
    ...jest,
  ],
  rules: {
    ...eslintRules,
    ...typescriptRules,
    ...importEsLintRules,
    ...jestRules,
  },
  settings: {
    ...importEsLintSettings,
  }
}
