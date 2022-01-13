const baseConfig = require('./../../jest.base.config');

/* eslint-disable unicorn/prefer-module */
module.exports = {
  ...baseConfig,

  collectCoverage: false,

  testEnvironment: 'jsdom',

  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^vue$': 'vue/dist/vue.common.js',
  },

  moduleFileExtensions: ['js', 'vue', 'json', 'ts'],
  
  transform: {
    ...baseConfig.transform,
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(css|svg)': 'jest-transform-stub',
  },

  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
  ],

  setupFiles: [
    'jest-date-mock',
    'jest-localstorage-mock',
  ],

  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],

  transformIgnorePatterns: [
    'node_modules/(?!(@storefront-ui)|vee-validate/dist/rules|nouislider)',
  ],

  modulePathIgnorePatterns: ['_theme', 'tests/e2e'],
};
