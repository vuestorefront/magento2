/* eslint-disable unicorn/prefer-module */
module.exports = {
  globals: { __DEV__: true },

  coverageReporters: ['lcov'],

  coverageThreshold: { global: {} },

  coveragePathIgnorePatterns: ['/node_modules/', '.d.ts$', '/__mocks__/'],

  coverageDirectory: './coverage/',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },

  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(css|svg)': 'jest-transform-stub',
  },

  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/middleware/**/*.js',
    '<rootDir>/plugins/**/*.js',
  ],

  setupFiles: [
    'jest-date-mock',
    'jest-localstorage-mock',
  ],

  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],

  transformIgnorePatterns: [
    'node_modules/(?!(@storefront-ui)|vee-validate/dist/rules|nouislider|lodash-es)',
  ],

  testMatch: ['<rootDir>/**/__tests__/**/*spec.[jt]s?(x)'],

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    ['jest-watch-toggle-config', { setting: 'verbose' }],
    ['jest-watch-toggle-config', { setting: 'collectCoverage' }],
    ['jest-watch-toggle-config', { setting: 'notify' }],
    ['jest-watch-toggle-config', { setting: 'bail' }],
  ],

  collectCoverage: false,

  moduleFileExtensions: ['js', 'vue', 'json', 'ts'],

  modulePathIgnorePatterns: ['_theme', 'tests/e2e'],
};
